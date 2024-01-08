import 'server-only';
import { unstable_cache as cache } from 'next/cache';

import prismaDb from '@/lib/prismaDb';

export const getUrlInfo = cache(
  async (urlId: string) => {
    const url = await prismaDb.longUrl.findFirst({
      where: {
        id: urlId,
      },
      select: {
        shortUrl: true,
        isActive: true,
        expirationDate: true,
      },
    });

    return {
      shortUrl: url?.shortUrl,
      isActive: url?.isActive,
      expirationDate: url?.expirationDate,
    };
  },
  ['get-url-info'],
  {
    revalidate: 10,
    tags: ['url-info'],
  },
);
