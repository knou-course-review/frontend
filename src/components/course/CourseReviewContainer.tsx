"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NewReviewForm from "./NewReviewForm";
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
  const [page, setPage] = useState(1);
  const { data, error, refetch } = useQuery({
    queryKey: ["all-reviews", page],
    queryFn: () => fetchAllReviews(page, courseId),
    placeholderData: keepPreviousData,
  });

  const handlePageSelect = (value: number) => setPage(value);
  const refreshData = () => refetch();
  const handleLastPage = () => {
    if (data.content.length === 1 && page === data.totalPages) {
      setPage(data.totalPages - 1);
    } else refreshData();
  };

  if (error) return <div className="flex flex-col gap-4">에러가 발생했습니다!</div>;
  if (!data) return <div className="w-full text-center">Loading ...</div>;
  return (
    <>
      <div>
        <NewReviewForm courseId={courseId} refreshData={refreshData} />
      </div>
      <div className="flex justify-between mt-8">
        <h1 className="font-bold text-lg">수강생 리뷰</h1>
      </div>
      <div className="flex flex-col gap-4">
        {data.content?.length > 0 ? (
          <>
            {data.content.map((review: UserReviewData) => (
              <UserReview key={review.id} {...review} refreshData={refreshData} handleLastPage={handleLastPage} />
            ))}
            <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
          </>
        ) : (
          <div className="w-full text-center">수강생 리뷰가 없는 강의입니다.</div>
        )}
      </div>
    </>
  );
}
