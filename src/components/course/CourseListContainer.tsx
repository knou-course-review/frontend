"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CoursePreview, { type CoursePreviewProps } from "./CoursePreview";
import CoursePreviewSkeleton from "./CoursePreviewSkeleton";
import PageNavigator from "../common/PageNavigator";

const fetchAllCourses = (page = 1) => fetch(`/api/courses?page=${page}`).then((res) => res.json());

export default function CourseListContainer() {
  const [page, setPage] = useState(1);
  const { data, error } = useQuery({
    queryKey: ["all-courses", page],
    queryFn: () => fetchAllCourses(page),
    placeholderData: keepPreviousData,
  });

  const handlePageSelect = (value: number) => setPage(value);

  if (error) return <div className="mb-100 text-center">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>;
  return (
    <div className="flex flex-col gap-4">
      {data
        ? data.content?.map((course: CoursePreviewProps) => <CoursePreview key={course.id} {...course} />)
        : Array.from({ length: 10 }, (_, i) => <CoursePreviewSkeleton key={i} />)}
      {data && (
        <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
      )}
    </div>
  );
}
