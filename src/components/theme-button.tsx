'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const ThemeButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { resolvedTheme: theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Skeleton className="h-6 w-[76px]" />;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="theme"
        onCheckedChange={toggleTheme}
        checked={theme === 'dark'}
        aria-label="Toggle theme"
      />

      <Label htmlFor="theme">
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </Label>
    </div>
  );
};

export default ThemeButton;
