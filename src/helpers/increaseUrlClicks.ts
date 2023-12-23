import 'server-only';

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

  return originalUrl;
};
