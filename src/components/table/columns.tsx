'use client';

import dynamic from 'next/dynamic';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon, Link2Icon, Link2OffIcon } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Actions } from './actions';

const QRCode = dynamic(() => import('@/components/qr-code'), {
  ssr: false,
  loading: () => <Skeleton className="h-9 w-9" />,
});

export type URLs = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  isActive: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<URLs>[] = [
  {
    accessorKey: 'shortUrl',
    header: 'Short Link',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <Link
          href={`http://${row.getValue('shortUrl')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[180px] flex-1 truncate hover:underline"
        >
          {row.getValue('shortUrl')}
        </Link>

        <CopyButton value={row.getValue('shortUrl')} />
      </div>
    ),
  },
  {
    accessorKey: 'originalUrl',
    header: 'Original Link',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <Image
          src={`https://www.google.com/s2/favicons?domain=${row.getValue(
            'originalUrl',
          )}&sz=32`}
          alt="Website logo"
          width={32}
          height={32}
          className="rounded-sm"
        />

        <span className="truncate">{row.getValue('originalUrl')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'qrCode',
    header: 'QR Code',
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger>
          <QRCode value={row.getValue('shortUrl')} />
        </HoverCardTrigger>

        <HoverCardContent>
          <QRCode value={row.getValue('shortUrl')} width={128} height={128} />
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: 'clicks',
    header: 'Clicks',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) =>
      row.getValue('isActive') ? (
        <div className="flex items-center gap-x-2 text-[#1EB036]">
          Active
          <div className="flex h-9 w-9  items-center justify-center rounded-full bg-[#1EB036]/20 p-0">
            <Link2Icon className="text-foreground" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-2 text-[#B0901E]">
          Inactive
          <div className="flex h-9 w-9  items-center justify-center rounded-full bg-[#B0901E]/20 p-0">
            <Link2OffIcon className="text-[#B0901E]" />
          </div>
        </div>
      ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{formatDate(row.getValue('createdAt'))}</span>,
  },
  {
    accessorKey: 'id',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Actions
        linkId={row.getValue('actions')}
        linkStatus={row.getValue('isActive')}
      />
    ),
  },
];
