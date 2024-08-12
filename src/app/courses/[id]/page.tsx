import CourseInfo from "@/components/course/CourseInfo";
import CourseReviewContainer from "@/components/course/CourseReviewContainer";
import NewReviewForm from "@/components/course/NewReviewForm";
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
    <div className="flex flex-col w-[950px] gap-4 py-24">
      <CourseInfo courseData={courseData} />
      <div>
        <NewReviewForm courseId={params.id} />
      </div>
      <div className="flex justify-between mt-8">
        <span>강의 후기</span>
      </div>
      <div className="flex flex-col gap-4">
        <CourseReviewContainer courseId={params.id} />
      </div>
    </div>
  );
}
