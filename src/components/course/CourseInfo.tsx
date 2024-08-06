import Label from "../Label";

export type CourseInfoProps = {
  id: number;
  courseName: string;
  professorName: string;
  departmentName: string;
  classification: string;
  classType: string;
  grade: number;
  semester: string;
  credit: number;
};

export default function CourseInfo({
  courseName,
  professorName,
  departmentName,
  classification,
  grade,
  semester,
}: CourseInfoProps) {
  return (
    <div className="p-6 border border-neutral-400 rounded-2xl flex justify-between h-40">
      <div className="flex flex-col justify-between">
        <h1 className="mb-3 text-2xl font-semibold">{courseName}</h1>
        <span>{professorName}</span>
        <span>
          {grade}학년 {semester}
        </span>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex gap-4">
          <Label text={departmentName} background="bg-neutral-400" display="inline-block" />
          <Label text={classification} background="bg-neutral-400" display="inline-block" />
        </div>
      </div>
    </div>
  );
}
