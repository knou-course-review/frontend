"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CoursePreview from "./CoursePreview";
import PageNavigator from "../PageNavigator";
import type { CourseInfoProps } from "./CourseInfo";

const fetchAllCourses = (page = 1) => fetch(`/api/courses?page=${page}`).then((res) => res.json());

export default function CourseListContainer() {
  const [page, setPage] = useState(1);
  const { data, error } = useQuery({
    queryKey: ["all-courses", page],
    queryFn: () => fetchAllCourses(page),
    placeholderData: keepPreviousData,
  });

  const handlePageSelect = (value: number) => setPage(value);

  if (error) return <div className="flex flex-col gap-4">에러가 발생했습니다!</div>;
  if (!data) return <div className="w-full text-center">Loading ...</div>;
  return (
    <div className="flex flex-col gap-4">
      {data.content.map((course: CourseInfoProps) => (
        <CoursePreview key={course.id} {...course} />
      ))}
      <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
    </div>
  );
}
