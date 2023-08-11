'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import prismaDb from '@/lib/prismaDb';

export const handleDeleteLink = async ({ linkId }: { linkId: string }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('You must be signed in to add an item to your cart');
  }

  if (!linkId) {
    throw new Error('You must provide a valid linkId');
  }

  await prismaDb.longUrl.delete({
    where: {
      id: linkId,
      AND: {
        userId,
      },
    },
  });

  revalidatePath('/');
};
