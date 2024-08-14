import CourseInfo from "@/components/course/CourseInfo";
import CourseReviewContainer from "@/components/course/CourseReviewContainer";
import { api } from "@/utils/api";

async function fetchCourse(id: string) {
  try {
    const res = await api.get(`/api/v1/course/${id}`);
    const body = await res.json();
    return body.data;
  } catch (e) {
    console.log(e);
  }
  return undefined;
}

export default async function CourseDetails({ params }: { params: { id: string } }) {
  const courseData = await fetchCourse(params.id);
  if (!courseData) return null;
  return (
    <div className="flex flex-col w-[93dvw] xl:w-[950px] pt-10 pb-24 xl:py-24 gap-4">
      <CourseInfo courseData={courseData} />
      <CourseReviewContainer courseId={params.id} />
    </div>
  );
}
