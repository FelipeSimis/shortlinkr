import { redirect } from 'next/navigation';

import { getUrlInfo } from '@/helpers/getUrlInfo';
import { increaseUrlClicks } from '@/helpers/increaseUrlClicks';

type PageParams = {
  params: {
    urlId: string;
  };
};

const UrlIdPage = async ({ params: { urlId } }: PageParams) => {
  const { shortUrl, isActive } = await getUrlInfo(urlId);

  if (!shortUrl || !isActive) {
    return redirect('/');
  }

  const originalUrl = await increaseUrlClicks(urlId);

  return redirect(originalUrl);
};

export default UrlIdPage;
