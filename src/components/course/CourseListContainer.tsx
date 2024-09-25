"use client";

import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CoursePreview, { type CoursePreviewProps } from "./CoursePreview";
import CoursePreviewSkeleton from "./CoursePreviewSkeleton";
import PageNavigator from "../common/PageNavigator";
import { STALE_TIME } from "@/constants/query";

const fetchAllCourses = (page = "1") => fetch(`/api/courses?page=${page}`).then((res) => res.json());

const select = (data: any) => {
  const combinedContent = data.content.map((course: any) => {
    const [reviews] = data.reviews.filter((reviewData: any) => reviewData.courseId === course.id);
    return { ...course, reviews };
  });
  return { ...data, content: combinedContent };
};

export default function CourseListContainer({ page }: { page?: string }) {
  const router = useRouter();
  const { data, error, isFetching } = useQuery({
    queryKey: ["all-courses", page],
    queryFn: () => fetchAllCourses(page),
    placeholderData: keepPreviousData,
    select,
    refetchOnWindowFocus: false,
    staleTime: STALE_TIME.courses,
  });

  const handlePageSelect = (value = "1") => {
    router.push(`/?page=${value}`, { scroll: false });
  };

  if (error) return <div className="mb-100 text-center">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>;
  return (
    <div className="flex flex-col gap-4">
      {isFetching ? (
        Array.from({ length: 10 }, (_, i) => <CoursePreviewSkeleton key={i} />)
      ) : data && data.content?.length > 0 ? (
        data.content.map((course: CoursePreviewProps) => <CoursePreview key={course.id} {...course} />)
      ) : (
        <div className="mb-100 text-center">강의 데이터가 없습니다. 관리자에게 문의해 주세요.</div>
      )}
      {data?.totalPages > 0 && (
        <PageNavigator
          currentPage={Number(page) ?? data.pageNumber}
          pages={data.totalPages}
          handlePageSelect={handlePageSelect}
        />
      )}
    </div>
  );
}
