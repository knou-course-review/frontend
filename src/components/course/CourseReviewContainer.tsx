"use client";

import { useState } from "react";
import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import NewReviewForm from "../reviews/NewReviewForm";
import PageNavigator from "../common/PageNavigator";
import UserReview from "../reviews/UserReview";
import UserReviewSkeleton from "../reviews/UserReviewSkeleton";

type ReviewLikes = {
  reviewId: number;
  likeCount: number;
  isLike: boolean;
};

export type UserReviewData = {
  id: number;
  userId: number;
  content: string;
  username: string;
  courseId: number;
  createdAt: string;
  owner: boolean;
  likeStatus: ReviewLikes;
};

type CourseReviewContainerProps = {
  courseId: string;
};

const fetchAllReviews = (page = 1, courseId: string) =>
  fetch(`/api/reviews?cid=${courseId}&page=${page}`).then((res) => res.json());

const select = (data: any) => {
  const combinedContent = data.content.map((review: any) => {
    const [likeStatus] = data.likes.filter((likeData: any) => likeData.reviewId === review.id);
    return { ...review, likeStatus };
  });
  return { ...data, content: combinedContent };
};

export default function CourseReviewContainer({ courseId }: CourseReviewContainerProps) {
  const [snackbar, setSnackbar] = useState({ isOpen: false, msg: "" });
  const [page, setPage] = useState(1);
  const { data, error, refetch } = useQuery({
    queryKey: ["all-reviews", page, courseId],
    queryFn: () => fetchAllReviews(page, courseId),
    placeholderData: keepPreviousData,
    select,
  });

  const handlePageSelect = (value: number) => setPage(value);
  const refreshData = () => refetch();
  const closeSnackbar = () => setSnackbar({ isOpen: false, msg: "" });
  const openSnackbar = (msg: string) => setSnackbar({ isOpen: true, msg });

  if (error) return <div className="text-center">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>;
  return (
    <>
      <div>
        <NewReviewForm courseId={courseId} refreshData={refreshData} />
      </div>
      <div className="mt-8">
        <Image src="/header-bar.svg" width={42} height={6} alt="수강생 리뷰 구간 표식" />
        <h1 className="mt-2 font-bold text-lg">수강생 리뷰</h1>
      </div>
      <div className="flex flex-col gap-4">
        {data ? (
          data.content?.length > 0 ? (
            <>
              {data.content.map((review: UserReviewData) => (
                <UserReview key={review.id} {...review} refreshData={refreshData} openSnackbar={openSnackbar} />
              ))}
              <PageNavigator
                currentPage={data.pageNumber}
                pages={data.totalPages}
                handlePageSelect={handlePageSelect}
              />
            </>
          ) : (
            <div className="w-full text-center">수강생 리뷰가 없는 강의입니다.</div>
          )
        ) : (
          Array.from({ length: 10 }, (_, i) => <UserReviewSkeleton key={i} />)
        )}
      </div>
      <Snackbar
        message={snackbar.msg}
        autoHideDuration={2000}
        open={snackbar.isOpen}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
