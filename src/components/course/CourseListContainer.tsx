import CoursePreview from "./CoursePreview";
import { MOCK_COURSES } from "@/constants/mockdata";

export default function CourseListContainer() {
  // API fetch
  return (
    <div className="flex flex-col gap-4">
      {MOCK_COURSES.map((course) => (
        <CoursePreview key={course.id} {...course} />
      ))}
    </div>
  );
}
