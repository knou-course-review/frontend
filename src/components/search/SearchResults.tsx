"use client";

import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CoursePreview, { type CoursePreviewProps } from "../course/CoursePreview";
import CoursePreviewSkeleton from "../course/CoursePreviewSkeleton";
import NoResults from "./NoResults";
import PageNavigator from "../common/PageNavigator";
import { STALE_TIME } from "@/constants/query";
import type { CourseSearchParams } from "@/app/search/page";

const fetchCourses = (page: string, searchType: string, name: string) =>
  fetch(`/api/search?searchType=${searchType}&name=${name}&page=${page}`).then((res) => res.json());

const select = (data: any) => {
  const combinedContent = data.content.map((course: any) => {
    const [reviews] = data.reviews.filter((reviewData: any) => reviewData.courseId === course.id);
    return { ...course, reviews };
  });
  console.log(combinedContent);
  return { ...data, content: combinedContent };
};

export default function SearchResults({ searchType, name, page }: CourseSearchParams) {
  const router = useRouter();
  const { data, error, isFetching } = useQuery({
    queryKey: ["search-results", page, searchType, name],
    queryFn: () => fetchCourses(page, searchType, name),
    placeholderData: keepPreviousData,
    select,
    refetchOnWindowFocus: false,
    staleTime: STALE_TIME.courses,
  });

  const handlePageSelect = (value = "1") => {
    router.push(`/search?searchType=${searchType}&name=${name}&page=${value}`, { scroll: false });
  };

  if (error) return <div className="text-center">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>;
  return (
    <div className="flex flex-col gap-4">
      {isFetching ? (
        Array.from({ length: 10 }, (_, i) => <CoursePreviewSkeleton key={i} />)
      ) : data && data.content?.length > 0 ? (
        data.content.map((course: CoursePreviewProps) => <CoursePreview key={course.id} {...course} />)
      ) : (
        <NoResults />
      )}
      {data?.totalPages > 0 && (
        <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
      )}
    </div>
  );
}
