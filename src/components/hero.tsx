import { LinkForm } from './link-form';

export const Hero = () => {
  return (
    <div className="flex flex-col place-items-center">
      <h1 className="mb-5 bg-gradient-to-r from-brand-primary-pink from-10% via-brand-primary-blue via-70% to-brand-primary-pink bg-clip-text text-center text-4xl font-extrabold leading-relaxed text-transparent md:text-6xl md:leading-loose">
        Shorten Your Looong Links :)
      </h1>

      <p className="mb-8 max-w-[634px] text-center font-light text-foreground">
        ShortLinkr is an efficient and easy-to-use URL shortening service that
        streamlines your online experience.
      </p>

      <LinkForm />
    </div>
  );
};
