'use client';

import { useTransition } from 'react';
import dynamic from 'next/dynamic';

import { handleEditLink } from '@/actions/handleEditLink';
import { handleDeleteLink } from '@/actions/handleDeleteLink';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingDots } from '@/components/loading-dots';
import type { ConfirmationButtonProps } from '@/components/dialogs/edit-url-dialog';

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
  linkExpirationDate: Date | undefined;
};

export const Actions = ({
  linkId,
  linkStatus,
  linkExpirationDate,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleEdit = ({
    isActive,
    expirationDate,
    closeDialog,
  }: ConfirmationButtonProps) => {
    startTransition(() => {
      handleEditLink({
        linkId,
        linkStatus: isActive,
        expirationDate: expirationDate || null,
      });
      closeDialog();
    });
  };

  const handleDelete = (closeDialog: () => void) => {
    startTransition(() => {
      handleDeleteLink({
        linkId,
      });
      closeDialog();
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <EditUrlDialog
        linkStatus={linkStatus}
        linkExpirationDate={linkExpirationDate}
        renderConfirmActionButton={({
          isActive,
          expirationDate,
          closeDialog,
        }) => (
          <Button
            onClick={() =>
              handleEdit({
                isActive,
                expirationDate,
                closeDialog,
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
            onClick={() => handleDelete(closeDialog)}
            disabled={isPending}
          >
            {isPending ? <LoadingDots /> : 'Delete'}
          </Button>
        )}
      />
    </div>
  );
};
