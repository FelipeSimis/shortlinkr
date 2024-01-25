'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import { ITEMS_PER_PAGE } from '@/constants';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  totalPages: number;
  canPreviousPage?: boolean;
  canNextPage?: boolean;
};

export const DataTable = <TData, TValue>({
  columns,
  data,
  page,
  totalPages,
  canPreviousPage,
  canNextPage,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const { push } = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: {
        pageIndex: page,
        pageSize: ITEMS_PER_PAGE,
      },
    },
    manualPagination: true,
    pageCount: totalPages,
    autoResetPageIndex: true,
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="h-16 rounded-e-lg bg-muted">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[15px] font-bold text-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="bg-muted/50">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cn('text-sm font-light text-foreground', {
                        'min-w-[170px] max-w-sm':
                          cell.id.includes('originalUrl'),
                      })}
                      title={
                        cell.id.includes('originalUrl')
                          ? cell.getValue<string>()
                          : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => push(`/?page=${page - 1}`)}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => push(`/?page=${page + 1}`)}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
