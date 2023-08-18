import { useState } from 'react';
import { CalendarIcon, PencilIcon } from 'lucide-react';

import { formatDate } from '@/lib/utils';

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
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

export type ConfirmationButtonProps = {
  isActive: boolean;
  expirationDate: Date | undefined;
  closeDialog: () => void;
};

type EditUrlDialogProps = {
  renderConfirmActionButton: ({
    isActive,
    expirationDate,
    closeDialog,
  }: ConfirmationButtonProps) => React.ReactNode;
  linkStatus: boolean;
  linkExpirationDate: Date | undefined;
};

export const EditUrlDialog = ({
  renderConfirmActionButton,
  linkStatus,
  linkExpirationDate,
}: EditUrlDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(linkStatus);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    linkExpirationDate,
  );

  const toggleLinkStatus = () => {
    setIsActive(prev => !prev);
  };

  const selectDate = (date: Date | undefined) => {
    setSelectedDate(date);
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
          <DialogTitle className="mb-2 text-base md:text-lg">
            Edit link
          </DialogTitle>
          <DialogDescription>
            Make changes to your url here. Click save when you&apos;re done
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-3 py-4">
          <div className="flex items-center gap-x-2">
            <span className="text-sm md:text-base">Link status: </span>

            <Switch
              id="isLinkActive"
              onCheckedChange={toggleLinkStatus}
              checked={isActive}
            />

            <Label htmlFor="isLinkActive">
              {isActive ? 'Active' : 'Inactive'}
            </Label>
          </div>

          <div className="flex items-center gap-x-2">
            <span className="text-sm md:text-base">Expiration Date: </span>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-x-2">
                  {selectedDate ? (
                    formatDate(selectedDate)
                  ) : (
                    <>
                      Pick a date <CalendarIcon className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={selectDate}
                  disabled={date => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <div>
            {renderConfirmActionButton({
              isActive,
              expirationDate: selectedDate,
              closeDialog,
            })}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
