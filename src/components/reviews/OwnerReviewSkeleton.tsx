import Skeleton from "@mui/material/Skeleton";

export default function OwnerReviewSkeleton() {
  return (
    <div className="flex flex-col w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#aab9e3] dark:bg-[#1d2945] dark:border-slate-600">
      <Skeleton width="35%" />
      <Skeleton width="25%" className="mb-4" />
      <Skeleton width="100%" />
      <Skeleton width="70%" />
    </div>
  );
}
