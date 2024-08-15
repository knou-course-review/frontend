import Skeleton from "@mui/material/Skeleton";

export default function UserReviewSkeleton() {
  return (
    <div className="flex flex-col w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-400">
      <div className="flex items-center gap-2">
        <Skeleton variant="circular" width={24} height={24} /> <Skeleton width={120} height={30} />
      </div>
      <Skeleton width="10%" className="mb-4" />
      <Skeleton width="100%" />
      <Skeleton width="70%" />
    </div>
  );
}
