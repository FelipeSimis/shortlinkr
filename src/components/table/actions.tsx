'use client';

import { useTransition } from 'react';
import dynamic from 'next/dynamic';

import { handleEditLink } from '@/actions/handleEditLink';
import { handleDeleteLink } from '@/actions/handleDeleteLink';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingDots } from '@/components/loading-dots';

const DeleteUrlDialog = dynamic(
  () =>
    import('@/components/dialogs/delete-url-dialog').then(
      mod => mod.DeleteUrlDialog,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-10 rounded-full" />,
  },
);

const EditUrlDialog = dynamic(
  () =>
    import('@/components/dialogs/edit-url-dialog').then(
      mod => mod.EditUrlDialog,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-10 rounded-full" />,
  },
);

type ActionsProps = {
  linkId: string;
  linkStatus: boolean;
};

export const Actions = ({ linkId, linkStatus }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-x-2">
      <EditUrlDialog
        linkStatus={linkStatus}
        renderConfirmActionButton={(isActive, closeDialog) => (
          <Button
            onClick={() =>
              startTransition(() => {
                handleEditLink({ linkId, linkStatus: isActive });

                closeDialog();
              })
            }
            disabled={isPending}
          >
            {isPending ? <LoadingDots /> : 'Save changes'}
          </Button>
        )}
      />

      <DeleteUrlDialog
        renderConfirmActionButton={closeDialog => (
          <Button
            variant="destructive"
            onClick={() =>
              startTransition(() => {
                handleDeleteLink({
                  linkId,
                });

                closeDialog();
              })
            }
            disabled={isPending}
          >
            {isPending ? <LoadingDots /> : 'Delete'}
          </Button>
        )}
      />
    </div>
  );
};
