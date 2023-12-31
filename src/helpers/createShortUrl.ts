import 'server-only';
import { revalidateTag } from 'next/cache';

import prismaDb from '@/lib/prismaDb';
import { generateShortUrl } from '@/lib/utils';

export const createShortUrl = async (userId: string, url: string) => {
  try {
    const { urlId, shortUrl } = generateShortUrl();

    const data = await prismaDb.longUrl.create({
      data: {
        id: urlId,
        userId,
        originalUrl: url,
        shortUrl,
      },
      select: {
        shortUrl: true,
      },
    });

    revalidateTag('current-user-urls');

    return data;
  } catch (error) {
    throw new Error();
  }
};
