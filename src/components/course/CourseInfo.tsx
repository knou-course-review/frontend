import Divider from "@mui/material/Divider";

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

const GRID_ITEM_CLASSES = "flex sm:min-w-60 h-fit items-center gap-2 sm:gap-4";
const LABEL_CLASSES =
  "w-[70px] sm:w-20 sm:px-2 rounded-md text-nowrap text-center text-sm text-white bg-[#1c3d8d] dark:bg-[#1b60c6]";

export default function CourseInfo({ courseData }: CourseInfoProps) {
  return (
    <>
      <div>
        <p className="text-2xl sm:text-3xl font-semibold">{courseData.courseName}</p>
        <p className="text-lg text-slate-500 dark:text-slate-300">{courseData.departmentName}</p>
      </div>
      <Divider />
      <div className="sm:flex sm:justify-between">
        <div className="grid grid-cols-2 gap-y-2">
          <div className={GRID_ITEM_CLASSES}>
            <div className={LABEL_CLASSES}>강사</div>
            <span>{courseData.professorName === " " ? "정보없음" : courseData.professorName}</span>
          </div>
          <div className={GRID_ITEM_CLASSES}>
            <div className={LABEL_CLASSES}>학년/학기</div>
            <span>
              {courseData.grade}학년 {courseData.semester}
            </span>
          </div>
          <div className={GRID_ITEM_CLASSES}>
            <div className={LABEL_CLASSES}>교과구분</div>
            <span>{courseData.classification}</span>
          </div>
          <div className={GRID_ITEM_CLASSES}>
            <div className={LABEL_CLASSES}>학점</div>
            <span>{courseData.credit}</span>
          </div>
          <div className={GRID_ITEM_CLASSES}>
            <div className={LABEL_CLASSES}>수업유형</div>
            <span>{courseData.classType}</span>
          </div>
        </div>
      </div>
    </>
  );
}
