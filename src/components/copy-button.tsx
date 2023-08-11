'use client';

import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type CopyButtonProps = {
  value: string;
};

export const CopyButton = ({ value }: CopyButtonProps) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      return toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
      });
    }

    return toast({
      title: 'Link copied!',
    });
  };

  return (
    <Button
      onClick={copyToClipboard}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/90 p-0 hover:bg-secondary/70"
      aria-label="Copy link"
      title="Copy link"
    >
      <CopyIcon className="h-4 w-4" />
    </Button>
  );
};
