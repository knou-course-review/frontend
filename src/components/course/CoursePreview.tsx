import Link from "next/link";
import Label from "../Label";

type CoursePreviewProps = {
  id: number;
  courseName: string;
  professor: string;
  department: string;
  classification: string;
  year: string;
  semester: string;
};

export default function CoursePreview({
  id,
  courseName,
  professor,
  department,
  classification,
  year,
  semester,
}: CoursePreviewProps) {
  return (
    <Link href={`/courses/${id}`} className="w-full">
      <div className="p-6 border border-neutral-400 rounded-2xl flex justify-between h-40">
        <div className="flex flex-col justify-between">
          <h1 className="mb-3 text-2xl font-semibold">{courseName}</h1>
          <span>{professor}</span>
          <span>
            {year} {semester}
          </span>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex gap-4">
            <Label text={department} background="bg-neutral-400" display="inline-block" />
            <Label text={classification} background="bg-neutral-400" display="inline-block" />
          </div>
          <div>상세 보기</div>
        </div>
      </div>
    </Link>
  );
}
