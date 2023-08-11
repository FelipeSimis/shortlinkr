import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />

      <Hero />

      {children}
    </>
  );
};

export default LandingLayout;
