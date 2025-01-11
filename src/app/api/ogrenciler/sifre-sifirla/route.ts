import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// E-posta gönderimi için transporter oluşturma
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Benzersiz token oluştur
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat geçerli

    // Token'ı veritabanına kaydet
    await prisma.user.update({
      where: { id: user.id },
      data: {
        biyografi: JSON.stringify({
          ...JSON.parse(user.biyografi || '{}'),
          resetToken,
          resetTokenExpiry: resetTokenExpiry.toISOString()
        })
      }
    });

    // Şifre sıfırlama bağlantısı oluştur
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/sifre-sifirla?token=${resetToken}`;

    console.log('E-posta gönderiliyor...', {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Şifre Sıfırlama Talebi'
    });

    // E-posta gönder
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Şifre Sıfırlama Talebi',
      html: `
        <h1>Şifre Sıfırlama</h1>
        <p>Merhaba ${user.ad},</p>
        <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Şifremi Sıfırla</a>
        <p>Bu bağlantı 24 saat boyunca geçerlidir.</p>
        <p>Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
        <p>Saygılarımızla,<br>Matematik Kebapçısı Ekibi</p>
      `,
    }).catch((error) => {
      console.error('E-posta gönderme hatası:', error);
      throw error;
    });

    console.log('E-posta başarıyla gönderildi');

    return NextResponse.json(
      { message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    return NextResponse.json(
      { error: 'Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 