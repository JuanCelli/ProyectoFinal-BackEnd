export const PRIVATE_KEY = "coder"
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '60s' });
};