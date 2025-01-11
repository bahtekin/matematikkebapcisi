import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar';

interface JwtPayload {
  userId: number;
  email: string;
  rol: string;
}

export const verifyJwtToken = async (token: string): Promise<JwtPayload | null> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('JWT doğrulama hatası:', error);
    return null;
  }
}; 