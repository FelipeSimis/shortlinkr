import 'server-only';
import { cache } from 'react';

import prismaDb from '@/lib/prismaDb';

export const getUrlInfo = cache(async (urlId: string) => {
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
});
