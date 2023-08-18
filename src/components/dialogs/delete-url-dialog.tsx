import { useState } from 'react';
import { TrashIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type DeleteUrlDialogProps = {
  renderConfirmActionButton: (closeDialog: () => void) => React.ReactNode;
};

export const DeleteUrlDialog = ({
  renderConfirmActionButton,
}: DeleteUrlDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-input bg-gray-blue p-0 hover:bg-gray-blue/80 hover:text-accent-foreground"
          aria-label="Delete link"
          title="Delete link"
        >
          <TrashIcon className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-base md:text-lg">
            Are you sure absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            short url and remove it from our server.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div>{renderConfirmActionButton(closeDialog)}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
