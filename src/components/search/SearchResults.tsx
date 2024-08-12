"use client";

import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CoursePreview, { type CoursePreviewProps } from "../course/CoursePreview";
import NoResults from "./NoResults";
import PageNavigator from "../PageNavigator";
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

  if (error) return <div className="flex flex-col gap-4">에러가 발생했습니다!</div>;
  if (!data) return <div className="w-full text-center">Loading ...</div>;
  return (
    <div className="flex flex-col gap-4">
      {data.content.length > 0 ? (
        <>
          {data.content.map((course: CoursePreviewProps) => (
            <CoursePreview key={course.id} {...course} />
          ))}
          <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
        </>
      ) : (
        <NoResults />
      )}
    </div>
  );
}
