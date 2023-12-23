import 'server-only';
import { auth } from '@clerk/nextjs/server';

import prismaDb from '@/lib/prismaDb';

import { ITEMS_PER_PAGE } from '@/constants';

type Props = {
  currentPage?: number;
};

export const getCurrentUserShortURLs = async ({ currentPage = 1 }: Props) => {
  const { userId } = auth();

  const [urls, totalUrls] = await prismaDb.$transaction([
    prismaDb.longUrl.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prismaDb.longUrl.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    urls,
    totalUrls,
  };
};
