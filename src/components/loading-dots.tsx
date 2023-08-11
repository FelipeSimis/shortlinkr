export const LoadingDots = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="h-2 w-2 animate-dots rounded-full bg-foreground" />
      <div className="h-2 w-2 animate-dots rounded-full bg-foreground delay-100" />
      <div className="h-2 w-2 animate-dots rounded-full bg-foreground delay-300" />
    </div>
  );
};
