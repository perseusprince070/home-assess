import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/;

export function validateCreateAgent(req: Request, res: Response, next: NextFunction): void {
  const { firstName, lastName, email, mobileNumber } = req.body;
  const errors: string[] = [];

  if (!firstName?.trim()) errors.push('firstName is required');
  if (!lastName?.trim()) errors.push('lastName is required');
  if (!email?.trim()) errors.push('email is required');
  else if (!EMAIL_REGEX.test(email)) errors.push('email is invalid');
  if (!mobileNumber?.trim()) errors.push('mobileNumber is required');
  else if (!PHONE_REGEX.test(mobileNumber)) errors.push('mobileNumber is invalid');

  if (errors.length > 0) {
    res.status(400).json({ success: false, error: 'Validation failed', details: errors });
    return;
  }
  next();
}

export function validateUpdateAgent(req: Request, res: Response, next: NextFunction): void {
  const { firstName, lastName, email, mobileNumber } = req.body;
  const errors: string[] = [];

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ success: false, error: 'No fields provided to update' });
    return;
  }

  if (firstName !== undefined && !firstName.trim()) errors.push('firstName cannot be empty');
  if (lastName !== undefined && !lastName.trim()) errors.push('lastName cannot be empty');
  if (email !== undefined) {
    if (!email.trim()) errors.push('email cannot be empty');
    else if (!EMAIL_REGEX.test(email)) errors.push('email is invalid');
  }
  if (mobileNumber !== undefined) {
    if (!mobileNumber.trim()) errors.push('mobileNumber cannot be empty');
    else if (!PHONE_REGEX.test(mobileNumber)) errors.push('mobileNumber is invalid');
  }

  if (errors.length > 0) {
    res.status(400).json({ success: false, error: 'Validation failed', details: errors });
    return;
  }
  next();
}
