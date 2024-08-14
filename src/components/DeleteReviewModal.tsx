"use client";

import Button from "@mui/material/Button";
import ModalFrame from "./ModalFrame";
import { deleteReview } from "@/actions/user-review";

type DeleteReviewModalProps = {
  reviewId: number;
  isShowing: boolean;
  closeModal: () => void;
  handleLastPage: () => void;
};

export default function DeleteReviewModal({ reviewId, isShowing, closeModal, handleLastPage }: DeleteReviewModalProps) {
  const handleReport = async () => {
    const res = await deleteReview(reviewId.toString());
    if (res.isValid) {
      handleLastPage();
    } else alert("오류가 발생했습니다 잠시 후 다시 시도해 주세요.");
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="내 리뷰 삭제하기" closeModal={closeModal}>
      <div className="w-96 text-center">
        <p className="my-10">
          삭제된 리뷰 내용은 복구할 수 없습니다.
          <br />
          리뷰를 삭제할까요?
        </p>
        <Button variant="contained" onClick={handleReport} fullWidth disableElevation>
          삭제
        </Button>
      </div>
    </ModalFrame>
  );
}
