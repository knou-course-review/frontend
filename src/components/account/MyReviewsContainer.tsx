"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import OwnerReview from "../reviews/OwnerReview";
import OwnerReviewSkeleton from "../reviews/OwnerReviewSkeleton";
import PageNavigator from "../common/PageNavigator";
import useSnackbar from "@/hooks/useSnackbar";

type MyReviewData = {
  id: number;
  userId: number;
  courseId: number;
  courseName: string;
  content: string;
  createdAt: string;
};

const fetchMyReviews = (page = 1) => fetch(`/api/account/reviews?page=${page}`).then((res) => res.json());

export default function MyReviewsContainer() {
  const { snackbar, closeSnackbar, openSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const { data, error, refetch } = useQuery({
    queryKey: ["my-reviews", page],
    queryFn: () => fetchMyReviews(page),
    placeholderData: keepPreviousData,
  });

  const handlePageSelect = (value: number) => setPage(value);
  const refreshData = () => refetch();
  const handleLastPage = () => {
    if (data.content.length === 1 && page === data.totalPages) {
      setPage(data.totalPages - 1);
    } else refreshData();
  };

  if (error) return <div className="text-center">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>;
  return (
    <>
      <div className="flex flex-col mt-4 gap-4">
        {data ? (
          data.content?.length > 0 ? (
            <>
              {data.content.map((review: MyReviewData) => (
                <OwnerReview
                  key={review.id}
                  {...review}
                  refreshData={refreshData}
                  handleLastPage={handleLastPage}
                  openSnackbar={openSnackbar}
                />
              ))}
              <PageNavigator
                currentPage={data.pageNumber}
                pages={data.totalPages}
                handlePageSelect={handlePageSelect}
              />
            </>
          ) : (
            <div className="w-full text-center">내가 쓴 리뷰가 없습니다.</div>
          )
        ) : (
          Array.from({ length: 10 }, (_, i) => <OwnerReviewSkeleton key={i} />)
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
