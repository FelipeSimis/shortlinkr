import 'server-only';
import { revalidateTag } from 'next/cache';

import prismaDb from '@/lib/prismaDb';

export const increaseUrlClicks = async (urlId: string) => {
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

  revalidateTag('current-user-urls');

  return originalUrl;
};
