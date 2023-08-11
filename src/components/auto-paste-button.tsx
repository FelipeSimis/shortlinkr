'use client';

import { useCallback, useEffect, useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { toast } from './ui/use-toast';

type AutoPasteButtonProps = {
  value: string;
  isSubmitSuccessful: boolean;
};

export const AutoPasteButton = ({
  value,
  isSubmitSuccessful,
}: AutoPasteButtonProps) => {
  const [isAutoPasteEnabled, setIsAutoPasteEnabled] = useState(true);

  const toggleAutoPaste = () => {
    setIsAutoPasteEnabled(previousState => !previousState);
  };

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
      });
    }
  }, [value]);

  useEffect(() => {
    if (isAutoPasteEnabled && isSubmitSuccessful) {
      copyToClipboard();
    }
  }, [copyToClipboard, isAutoPasteEnabled, isSubmitSuccessful]);

  return (
    <div className="mb-10 mt-8 flex items-center gap-x-3">
      <Switch
        id="autoPaste"
        onCheckedChange={toggleAutoPaste}
        checked={isAutoPasteEnabled}
        aria-label="Toggle auto paste"
      />

      <span className="text-sm font-light text-foreground">
        Auto Paste from Clipboard
      </span>
    </div>
  );
};
