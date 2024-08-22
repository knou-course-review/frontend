"use client";

import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CoursePreview, { type CoursePreviewProps } from "../course/CoursePreview";
import CoursePreviewSkeleton from "../course/CoursePreviewSkeleton";
import NoResults from "./NoResults";
import PageNavigator from "../common/PageNavigator";
import type { CourseSearchParams } from "@/app/search/page";

const fetchCourses = (page = 1, params: CourseSearchParams) =>
  fetch(`/api/search?searchType=${params.searchType}&name=${params.name}&page=${page}`).then((res) => res.json());

export default function SearchResults({ searchType, name }: CourseSearchParams) {
  const [page, setPage] = useState(1);
  const { data, error } = useQuery({
    queryKey: ["search-results", page, searchType, name],
    queryFn: () => fetchCourses(page, { searchType, name }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setPage(1);
  }, [searchType, name]);

  const handlePageSelect = (value: number) => setPage(value);

  if (error) return <div className="text-center">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>;
  return (
    <div className="flex flex-col gap-4">
      {data ? (
        data.content.length > 0 ? (
          <>
            {data.content.map((course: CoursePreviewProps) => (
              <CoursePreview key={course.id} {...course} />
            ))}
            <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
          </>
        ) : (
          <NoResults />
        )
      ) : (
        Array.from({ length: 10 }, (_, i) => <CoursePreviewSkeleton key={i} />)
      )}
    </div>
  );
}
