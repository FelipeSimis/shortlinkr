import 'server-only';
import { unstable_cache as cache } from 'next/cache';

import prismaDb from '@/lib/prismaDb';

import { ITEMS_PER_PAGE } from '@/constants';

type Props = {
  userId: string;
  currentPage?: number;
};

export const getCurrentUserShortURLs = cache(
  async ({ userId, currentPage = 1 }: Props) => {
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
  },
  ['get-current-user-urls'],
  {
    revalidate: 10,
    tags: ['current-user-urls'],
  },
);
