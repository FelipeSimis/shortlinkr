import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { createShortUrl } from '@/helpers/createShortUrl';

import { linkSchema } from '@/validations/linkData';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    const body = await request.json();

    const { url } = linkSchema.parse(body);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!url) {
      return new NextResponse('URL is required', { status: 400 });
    }

    const { shortUrl } = await createShortUrl(userId, url);

    return NextResponse.json({ shortUrl }, { status: 201 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
