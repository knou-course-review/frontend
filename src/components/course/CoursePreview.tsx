import Link from "next/link";
import Label from "../Label";

export type CoursePreviewProps = {
  id: number;
  courseName: string;
  professorName: string;
  departmentName: string;
  classification: string;
  grade: number;
  semester: string;
};

export default function CoursePreview({
  id,
  courseName,
  professorName,
  departmentName,
  classification,
  grade,
  semester,
}: CoursePreviewProps) {
  return (
    <Link href={`/courses/${id}`} className="w-full">
      <div className="flex h-40 p-4 sm:p-6 justify-between rounded-2xl border border-neutral-400 hover:border-sky-400">
        <div className="flex flex-col justify-between">
          <h1 className="mb-3 text-xl sm:text-2xl font-semibold">{courseName}</h1>
          <span>{professorName}</span>
          <span>
            {grade}학년 {semester}
          </span>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex gap-2">
            <Label text={departmentName} background="bg-neutral-400" display="inline-block" />
            <Label text={classification} background="bg-neutral-400" display="inline-block" />
          </div>
          <div>상세 보기</div>
        </div>
      </div>
    </Link>
  );
}
