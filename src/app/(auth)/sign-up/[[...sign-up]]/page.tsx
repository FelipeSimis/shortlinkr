import type { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up to create a Shortlinkr account',
};

const SignUpPage = () => {
  return <SignUp signInUrl="/sign-in" />;
};

export default SignUpPage;
