import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Admin token'ını sil
  response.cookies.delete('admin_token')
  
  return response
} 