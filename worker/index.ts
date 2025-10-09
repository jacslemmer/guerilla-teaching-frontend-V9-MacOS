/**
 * Guerilla Teaching Cloudflare Worker
 * Main entry point - handles all API routes
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import cmsApp from './cms';

// Types
interface Env {
  DB: D1Database;
  CACHE: KVNamespace;
  BUCKET: R2Bucket;
  JWT_SECRET?: string;
}

// Initialize main app
const app = new Hono<{ Bindings: Env }>();

// Global CORS
app.use('/*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'https://guerilla-teaching.pages.dev', 'https://guerilla-teaching.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'Guerilla Teaching API',
    version: '2.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (c) => {
  return c.json({
    api: 'Guerilla Teaching API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: 'cloudflare-workers'
  });
});

// Mount CMS routes
app.route('/api/cms', cmsApp);

// ===============================
// QUOTES API (existing functionality)
// ===============================

// Generate unique reference number
function generateReferenceNumber(existingRefs: string[] = []): string {
  const year = new Date().getFullYear();
  let counter = 1;
  let reference: string;

  do {
    reference = `GT-${year}-${counter.toString().padStart(4, '0')}`;
    counter++;
  } while (existingRefs.includes(reference));

  return reference;
}

// Generate UUID v4
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Create quote
app.post('/api/quotes', async (c) => {
  try {
    const body = await c.req.json();
    const { customer, items, comments } = body;

    if (!customer || !items || items.length === 0) {
      return c.json({
        error: 'Missing required fields: customer and items are required'
      }, 400);
    }

    // Get existing references
    const existingRefs = await c.env.DB.prepare('SELECT reference_number FROM quotes').all();
    const refNumbers = existingRefs.results.map((r: any) => r.reference_number);

    // Calculate total
    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Generate IDs
    const referenceNumber = generateReferenceNumber(refNumbers);
    const quoteId = generateUUID();

    // Create quote
    await c.env.DB.prepare(`
      INSERT INTO quotes (id, reference_number, customer_data, items, total_amount, currency, status, comments)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      quoteId,
      referenceNumber,
      JSON.stringify(customer),
      JSON.stringify(items),
      totalAmount,
      'ZAR',
      'pending',
      comments || null
    ).run();

    return c.json({
      success: true,
      quote: {
        id: quoteId,
        referenceNumber,
        customer,
        items,
        totalAmount,
        currency: 'ZAR',
        status: 'pending',
        comments,
        createdAt: new Date().toISOString(),
      }
    }, 201);
  } catch (error) {
    console.error('Error creating quote:', error);
    return c.json({ error: 'Failed to create quote' }, 500);
  }
});

// Get all quotes
app.get('/api/quotes', async (c) => {
  try {
    const result = await c.env.DB.prepare(
      'SELECT * FROM quotes ORDER BY created_at DESC LIMIT 100'
    ).all();

    const quotes = result.results.map((row: any) => ({
      id: row.id,
      referenceNumber: row.reference_number,
      customer: JSON.parse(row.customer_data),
      items: JSON.parse(row.items),
      totalAmount: row.total_amount,
      currency: row.currency,
      status: row.status,
      comments: row.comments,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return c.json({ quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return c.json({ error: 'Failed to fetch quotes' }, 500);
  }
});

// Get quote by reference number
app.get('/api/quotes/:reference', async (c) => {
  try {
    const reference = c.req.param('reference');

    const row = await c.env.DB.prepare(
      'SELECT * FROM quotes WHERE reference_number = ?'
    ).bind(reference).first();

    if (!row) {
      return c.json({ error: 'Quote not found' }, 404);
    }

    const quote = {
      id: row.id,
      referenceNumber: row.reference_number,
      customer: JSON.parse(row.customer_data as string),
      items: JSON.parse(row.items as string),
      totalAmount: row.total_amount,
      currency: row.currency,
      status: row.status,
      comments: row.comments,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };

    return c.json({ quote });
  } catch (error) {
    console.error('Error fetching quote:', error);
    return c.json({ error: 'Failed to fetch quote' }, 500);
  }
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;
