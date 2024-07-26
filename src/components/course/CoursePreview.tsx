import Link from "next/link";
import Label from "../Label";

type CoursePreviewProps = {
  courseName: string;
  professor: string;
  department: string;
  classification: string;
  year: string;
  semester: string;
};

export default function CoursePreview({
  courseName,
  professor,
  department,
  classification,
  year,
  semester,
}: CoursePreviewProps) {
  return (
    <Link href="/test">
      <div className="p-6 border border-slate-400 rounded-2xl flex justify-between w-full h-40">
        <div className="flex flex-col justify-between">
          <h1 className="mb-3 text-2xl font-semibold">{courseName}</h1>
          <span>{professor}</span>
          <span>
            {year} {semester}
          </span>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex gap-4">
            <Label text={department} background="bg-slate-400" display="inline-block" />
            <Label text={classification} background="bg-slate-400" display="inline-block" />
          </div>
          <div>sdf</div>
        </div>
      </div>
    </Link>
  );
}
