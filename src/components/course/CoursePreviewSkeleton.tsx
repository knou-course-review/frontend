import Skeleton from "@mui/material/Skeleton";

export default function CoursePreviewSkeleton() {
  return (
    <div className="flex w-full h-40 p-4 sm:p-6 justify-between rounded-2xl border border-neutral-400 hover:border-[#20c1f5]">
      <div className="flex flex-col">
        <Skeleton animation="wave" variant="text" width={150} height={70} />
        <Skeleton animation="wave" width="80%" />
        <Skeleton animation="wave" width="30%" />
        <Skeleton animation="wave" width="50%" />
      </div>
      <div className="flex flex-col justify-between items-end">
        <Skeleton animation="wave" variant="rounded" width={61} height={32} sx={{ borderRadius: "50px" }} />
        <Skeleton animation="wave" width={70} height={32} />
      </div>
    </div>
  );
}
