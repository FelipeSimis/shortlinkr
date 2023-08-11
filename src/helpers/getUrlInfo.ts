import prismaDb from '@/lib/prismaDb';

export const getUrlInfo = async (urlId: string) => {
  const url = await prismaDb.longUrl.findFirst({
    where: {
      id: urlId,
    },
    select: {
      shortUrl: true,
      isActive: true,
    },
  });

  return {
    shortUrl: url?.shortUrl,
    isActive: url?.isActive,
  };
};
