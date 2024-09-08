import Link from "next/link";
import Label from "../common/Label";

export type CoursePreviewProps = {
  id: number;
  courseName: string;
  professorName: string;
  departmentName: string;
  classification: string;
  grade: number;
  semester: string;
  reviews: { courseId: number; reviewCount: number };
};

export default function CoursePreview({
  id,
  courseName,
  professorName,
  departmentName,
  classification,
  grade,
  semester,
  reviews,
}: CoursePreviewProps) {
  return (
    <Link href={`/courses/${id}`} className="w-full">
      <div className="flex h-40 p-4 sm:p-6 justify-between rounded-2xl border border-[#aab9e3] dark:border-slate-600 bg-[#fcfcff] dark:bg-[#1d2945] hover:border-[#20c1f5]">
        <div className="flex flex-col justify-between">
          <h1 className="mb-3 text-xl sm:text-2xl font-semibold">{courseName}</h1>
          <span>{departmentName}</span>
          <span>{professorName}</span>
          <span>
            {grade}학년 {semester}
          </span>
        </div>
        <div className="flex flex-col justify-between items-end">
          <Label text={classification} background="bg-[#1b60c6]" display="inline-block" />
          <div>
            리뷰 <span className="text-[#65a3ff]">{reviews.reviewCount.toLocaleString("ko-KR")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
