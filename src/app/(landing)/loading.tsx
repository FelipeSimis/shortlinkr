import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[500px] w-full" />

      <div className="flex items-center justify-end gap-x-2 pb-4">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
      </div>
    </div>
  );
};

export default Loading;
