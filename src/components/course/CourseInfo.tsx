import Label from "../Label";

export type CourseInfoProps = {
  courseData: CourseDetails;
};

type CourseDetails = {
  id: number;
  courseName: string;
  departmentName: string;
  professorName: string;
  classification: string;
  classType: string;
  grade: number;
  semester: string;
  credit: number;
};

export default function CourseInfo({ courseData }: CourseInfoProps) {
  return (
    <div className="p-6 border border-neutral-400 rounded-2xl flex justify-between h-40">
      <div className="flex flex-col justify-between">
        <h1 className="mb-3 text-2xl font-semibold">{courseData.courseName}</h1>
        <span>{courseData.professorName}</span>
        <span>
          {courseData.grade}학년 {courseData.semester}
        </span>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex gap-4">
          <Label text={courseData.departmentName} background="bg-neutral-400" display="inline-block" />
          <Label text={courseData.classification} background="bg-neutral-400" display="inline-block" />
        </div>
      </div>
    </div>
  );
}
