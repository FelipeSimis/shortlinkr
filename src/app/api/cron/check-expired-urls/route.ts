import { NextResponse } from 'next/server';

import prismaDb from '@/lib/prismaDb';

export async function GET() {
  try {
    await prismaDb.longUrl.updateMany({
      where: {
        expirationDate: {
          lt: new Date(),
        },
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
