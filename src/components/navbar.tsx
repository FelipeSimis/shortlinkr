import Link from 'next/link';
import { ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ThemeButton from '@/components/theme-button';
import { Skeleton } from '@/components/ui/skeleton';

export const Navbar = () => {
  return (
    <div className="mb-20 flex w-full items-center justify-between md:mb-32">
      <Link
        href="/"
        className="bg-gradient-to-r from-brand-primary-pink from-10% via-brand-primary-blue via-70% to-brand-primary-pink bg-clip-text text-4xl font-extrabold text-transparent"
      >
        ShortLinkr
      </Link>

      <div className="flex items-center gap-x-5">
        <ThemeButton />

        <SignedIn>
          <ClerkLoading>
            <Skeleton className="h-[32px] w-[32px] rounded-full" />
          </ClerkLoading>

          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="h-11 gap-x-2 font-semibold md:h-[60px] md:text-lg"
            >
              Login <LogIn className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/sign-up" className="hidden md:block">
            <Button className="h-[60px] text-lg font-semibold">
              Register Now
            </Button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};
