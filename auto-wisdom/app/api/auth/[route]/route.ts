import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database
const users = [
  {
    id: '1',
    email: 'demo@autowisdom.com',
    password: 'demo123', // In reality, this would be hashed
    username: 'Demo User'
  }
];

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  
  if (pathname.endsWith('/login')) {
    return handleLogin(request);
  }
  
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  
  if (pathname.endsWith('/validate')) {
    return handleValidation(request);
  }
  
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

async function handleLogin(request: Request) {
  const { email, password } = await request.json();

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json({
    user: userWithoutPassword,
    token
  });
}

async function handleValidation(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}