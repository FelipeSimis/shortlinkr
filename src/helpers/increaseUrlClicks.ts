import 'server-only';
import { unstable_cache as cache } from 'next/cache';

import prismaDb from '@/lib/prismaDb';

export const increaseUrlClicks = cache(async (urlId: string) => {
  const { originalUrl } = await prismaDb.longUrl.update({
    where: {
      id: urlId,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
    select: {
      originalUrl: true,
    },
  });

  return originalUrl;
});
