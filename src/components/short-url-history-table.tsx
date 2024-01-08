import { auth } from '@clerk/nextjs';

import { getCurrentUserShortURLs } from '@/helpers/getCurrentUserUrls';

import { ITEMS_PER_PAGE } from '@/constants';

import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/table/columns';

type ShortUrlHistoryTableProps = {
  page: number;
};

export const ShortUrlHistoryTable = async ({
  page,
}: ShortUrlHistoryTableProps) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const { urls, totalUrls } = await getCurrentUserShortURLs({
    userId,
    currentPage: page,
  });

  const totalPages = Math.ceil(totalUrls / ITEMS_PER_PAGE);
  const canPreviousPage = page > 1;
  const canNextPage = totalUrls > ITEMS_PER_PAGE * page;

  return (
    <DataTable
      columns={columns}
      data={urls}
      page={page}
      totalPages={totalPages}
      canPreviousPage={canPreviousPage}
      canNextPage={canNextPage}
    />
  );
};
