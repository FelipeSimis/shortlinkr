'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';

import { fetchWrapper } from '@/services/api';

import { cn } from '@/lib/utils';

import { LinkData, linkSchema } from '@/validations/linkData';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AutoPasteButton } from '@/components/auto-paste-button';
import { LoadingDots } from '@/components/loading-dots';

type ShortUrlResponse = {
  shortUrl: string;
};

export const LinkForm = () => {
  const [generatedShortUrl, setGeneratedShortUrl] = useState('');

  const { isSignedIn } = useAuth();

  const { push, refresh } = useRouter();

  const { toast } = useToast();

  const form = useForm<LinkData>({
    defaultValues: {
      url: '',
    },
    resolver: zodResolver(linkSchema),
  });

  const onSubmit = async (values: LinkData) => {
    try {
      if (!isSignedIn) {
        push('/sign-in');

        return;
      }

      const { shortUrl } = await fetchWrapper<ShortUrlResponse>('/api/short', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      setGeneratedShortUrl(shortUrl);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Maybe you already shortened this link',
        variant: 'destructive',
      });
    } finally {
      refresh();
      form.reset();
    }
  };

  const isSubmittingForm = form.formState.isSubmitting;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${cn(
            'flex w-full max-w-xl items-center justify-between rounded-full py-1 pl-6 pr-1 ring-4 ring-border',
            {
              'ring-red-500/70': form.formState.errors.url,
            },
          )}`}
        >
          <div className="flex flex-1 items-center gap-x-2">
            <LinkIcon />

            <FormField
              name="url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      disabled={isSubmittingForm}
                      className="border-0 font-light outline-none placeholder:text-foreground focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Enter the link here"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            className="h-11 w-11 p-0 md:w-auto md:px-4"
            disabled={isSubmittingForm}
            aria-label="Shorten"
          >
            {isSubmittingForm ? (
              <LoadingDots />
            ) : (
              <>
                <p className="hidden md:block">Shorten Now!</p>

                <ArrowRight className="h-4 w-4 md:hidden" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <AutoPasteButton
        value={generatedShortUrl}
        isSubmitSuccessful={form.formState.isSubmitSuccessful}
      />
    </>
  );
};
