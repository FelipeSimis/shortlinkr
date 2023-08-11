'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import prismaDb from '@/lib/prismaDb';

type HandleEditLinkProps = {
  linkId: string;
  linkStatus: boolean;
};

export const handleEditLink = async ({
  linkId,
  linkStatus,
}: HandleEditLinkProps) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('You must be signed in to add an item to your cart');
  }

  if (!linkId) {
    throw new Error('You must provide a valid linkId');
  }

  await prismaDb.longUrl.update({
    where: {
      id: linkId,
      AND: {
        userId,
      },
    },
    data: {
      isActive: linkStatus,
    },
  });

  revalidatePath('/');
};
