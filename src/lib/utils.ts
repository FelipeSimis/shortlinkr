import { nanoid } from 'nanoid';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateShortUrl = () => {
  const urlId = nanoid(8);

  return {
    urlId,
    shortUrl: `${baseUrl}/${urlId}`,
  };
};

export const formatDate = (date: Date | string) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));

  return formattedDate.replace(/,/g, '').replace(/\s+/g, ' - ');
};
