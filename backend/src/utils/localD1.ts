/**
 * Local D1 Database Helper for Development
 * Provides access to wrangler's local D1 database
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Path to wrangler's local D1 database
const getLocalD1Path = (): string => {
  const projectRoot = path.resolve(__dirname, '../../../');
  const d1Path = path.join(projectRoot, '.wrangler/state/v3/d1');
  const miniflareDir = path.join(d1Path, 'miniflare-D1DatabaseObject');

  // Find the .sqlite file in the miniflare directory
  if (fs.existsSync(miniflareDir)) {
    const files = fs.readdirSync(miniflareDir);
    const sqliteFile = files.find(f => f.endsWith('.sqlite') && !f.includes('-shm') && !f.includes('-wal'));
    if (sqliteFile) {
      const dbPath = path.join(miniflareDir, sqliteFile);
      console.log('📦 Found D1 database at:', dbPath);
      return dbPath;
    }
  }

  // Fallback: search in d1 directory root
  if (fs.existsSync(d1Path)) {
    const files = fs.readdirSync(d1Path);
    const sqliteFile = files.find(f => f.endsWith('.sqlite'));
    if (sqliteFile) {
      const dbPath = path.join(d1Path, sqliteFile);
      console.log('📦 Found D1 database at:', dbPath);
      return dbPath;
    }
  }

  throw new Error('Could not find wrangler local D1 database');
};

// Create a D1-like interface wrapper around better-sqlite3
class LocalD1Database {
  private db: Database.Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
  }

  prepare(sql: string) {
    return {
      bind: (...params: any[]) => {
        return {
          run: () => {
            try {
              const stmt = this.db.prepare(sql);
              const info = stmt.run(...params);
              return {
                success: true,
                meta: {
                  duration: 0,
                  last_row_id: info.lastInsertRowid,
                  changes: info.changes,
                  rows_read: 0,
                  rows_written: info.changes
                }
              };
            } catch (error: any) {
              return {
                success: false,
                error: error.message
              };
            }
          },
          first: () => {
            try {
              const stmt = this.db.prepare(sql);
              const result = stmt.get(...params);
              return result || null;
            } catch (error) {
              return null;
            }
          },
          all: () => {
            try {
              const stmt = this.db.prepare(sql);
              const results = stmt.all(...params);
              return {
                success: true,
                results: results || [],
                meta: {
                  duration: 0
                }
              };
            } catch (error: any) {
              return {
                success: false,
                results: [],
                error: error.message
              };
            }
          }
        };
      },
      // Also support direct execution without bind
      run: () => {
        try {
          const info = this.db.prepare(sql).run();
          return {
            success: true,
            meta: {
              duration: 0,
              last_row_id: info.lastInsertRowid,
              changes: info.changes
            }
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message
          };
        }
      },
      first: () => {
        try {
          const result = this.db.prepare(sql).get();
          return result || null;
        } catch (error) {
          return null;
        }
      },
      all: () => {
        try {
          const results = this.db.prepare(sql).all();
          return {
            success: true,
            results: results || []
          };
        } catch (error: any) {
          return {
            success: false,
            results: [],
            error: error.message
          };
        }
      }
    };
  }

  close() {
    this.db.close();
  }
}

let localD1Instance: LocalD1Database | null = null;

export const getLocalD1Database = (): any => {
  if (!localD1Instance) {
    const dbPath = getLocalD1Path();
    console.log('📦 Connecting to local D1 database:', dbPath);
    localD1Instance = new LocalD1Database(dbPath);
  }
  return localD1Instance;
};

export const closeLocalD1Database = () => {
  if (localD1Instance) {
    localD1Instance.close();
    localD1Instance = null;
  }
};
