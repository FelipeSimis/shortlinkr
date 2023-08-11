import { useState } from 'react';
import { PencilIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type EditUrlDialogProps = {
  renderConfirmActionButton: (
    isActive: boolean,
    closeDialog: () => void,
  ) => React.ReactNode;
  linkStatus: boolean;
};

export const EditUrlDialog = ({
  renderConfirmActionButton,
  linkStatus,
}: EditUrlDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(linkStatus);

  const toggleLinkStatus = () => {
    setIsActive(!isActive);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-input bg-gray-blue p-0 hover:bg-gray-blue/80 hover:text-accent-foreground"
          aria-label="Edit link"
          title="Edit link"
        >
          <PencilIcon className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Edit link</DialogTitle>
          <DialogDescription>
            Make changes to your url here. Click save when you&apos;re done
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-x-2">
            <span>Link status: </span>

            <Switch
              id="isLinkActive"
              onCheckedChange={toggleLinkStatus}
              checked={isActive}
            />

            <Label htmlFor="isLinkActive">
              {isActive ? 'Active' : 'Inactive'}
            </Label>
          </div>
        </div>

        <DialogFooter>
          <div>{renderConfirmActionButton(isActive, closeDialog)}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
