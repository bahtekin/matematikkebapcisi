import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false })
    }

    // Token'ı doğrula
    const decoded = verify(token, JWT_SECRET) as any

    // Admin rolünü kontrol et
    if (decoded.rol !== 'ADMIN') {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ 
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        rol: decoded.rol
      }
    })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
} 