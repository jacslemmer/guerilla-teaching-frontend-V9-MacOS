import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { generateToken, AuthRequest } from '../middleware/auth';
import {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserLastLogin,
  updateUserPassword
} from '../services/cmsDatabase';

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Get user from database
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash || '');
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update last login
    await updateUserLastLogin(user.id!);

    // Generate token
    const token = generateToken({
      id: user.id!,
      email: user.email,
      role: user.role
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, full_name, role = 'editor' } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await createUser({
      email,
      password_hash,
      full_name,
      role
    });

    // Generate token
    const token = generateToken({
      id: result.meta.last_row_id,
      email,
      role
    });

    res.status(201).json({
      token,
      user: {
        id: result.meta.last_row_id,
        email,
        full_name,
        role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user
    const user = await findUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash || '');
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    await updateUserPassword(req.user.id, newPasswordHash);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
