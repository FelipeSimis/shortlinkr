import type { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Shortlinkr account',
};

const SignInPage = () => {
  return <SignIn signUpUrl="/sign-up" />;
};

export default SignInPage;
