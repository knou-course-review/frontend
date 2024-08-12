"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageNavigator from "../PageNavigator";
import UserReview from "./UserReview";

type UserReviewData = {
  id: number;
  userId: number;
  content: string;
  username: string;
  courseId: number;
  createdAt: string;
  owner: boolean;
};

type CourseReviewContainerProps = {
  courseId: string;
};

const fetchAllReviews = (page = 1, courseId: string) =>
  fetch(`/api/reviews?cid=${courseId}&page=${page}`).then((res) => res.json());

export default function CourseReviewContainer({ courseId }: CourseReviewContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { data, error } = useQuery({
    queryKey: ["all-reviews", page],
    queryFn: () => fetchAllReviews(page, courseId),
    placeholderData: keepPreviousData,
  });

  const handlePageSelect = (value: number) => setPage(value);

  if (error) return <div className="flex flex-col gap-4">에러가 발생했습니다!</div>;
  if (!data) return <div className="w-full text-center">Loading ...</div>;
  return (
    <div className="flex flex-col gap-4">
      {data.content.map((review: UserReviewData) => (
        <UserReview key={review.id} {...review} />
      ))}
      <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
    </div>
  );
}
