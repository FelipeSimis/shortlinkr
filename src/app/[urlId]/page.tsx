import { redirect } from 'next/navigation';

import { getUrlInfo } from '@/helpers/getUrlInfo';
import { increaseUrlClicks } from '@/helpers/increaseUrlClicks';

type PageParams = {
  params: {
    urlId: string;
  };
};

const UrlIdPage = async ({ params: { urlId } }: PageParams) => {
  const urlInfo = getUrlInfo(urlId);

  const originalUrlPromise = increaseUrlClicks(urlId);

  const [{ shortUrl, isActive, expirationDate }, originalUrl] =
    await Promise.all([urlInfo, originalUrlPromise]);

  if (
    !shortUrl ||
    !isActive ||
    (expirationDate && expirationDate < new Date())
  ) {
    return redirect('/');
  }

  return redirect(originalUrl);
};

export default UrlIdPage;
