"use client";

import { useState } from "react";
import Link from "next/link";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import DeleteReviewModal from "../modals/DeleteReviewModal";
import EditReviewForm from "../reviews/EditReviewForm";

type OwnerReviewProps = {
  id: number;
  courseId: number;
  courseName: string;
  content: string;
  createdAt: string;
  refreshData: () => void;
  handleLastPage: () => void;
  openSnackbar: (msg: string) => void;
};

const extractDate = (string: string) => {
  const array = string.split("T");
  return array[0];
};

export default function OwnerReview({
  id,
  courseId,
  courseName,
  content,
  createdAt,
  refreshData,
  handleLastPage,
  openSnackbar,
}: OwnerReviewProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => setIsShowing(true);
  const closeModal = () => setIsShowing(false);
  const toggleEditMode = () => setIsEditing(!isEditing);

  return (
    <>
      <div
        className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#aab9e3] bg-[#fcfcff] dark:bg-[#151f36] dark:border-slate-600`}
      >
        <div className="flex justify-between">
          <div>
            과목:{" "}
            <Link className="orange-link text-slate-400" href={`/courses/${courseId}`} target="_blank">
              {courseName}
            </Link>
            <br />
            작성 일자: <span className="text-slate-400">{extractDate(createdAt)}</span>
            <br />
          </div>
          <div className="self-start">
            <Edit className="cursor-pointer" fontSize="small" onClick={toggleEditMode} />{" "}
            <Delete className="cursor-pointer" fontSize="small" onClick={() => openModal()} />
          </div>
        </div>
        <div className="relative mt-4">
          {isEditing ? (
            <EditReviewForm
              courseId={id.toString()}
              oldContent={content}
              closeModal={toggleEditMode}
              refreshData={refreshData}
            />
          ) : (
            <p className="whitespace-pre-line">{content}</p>
          )}
        </div>
      </div>
      <DeleteReviewModal
        isShowing={isShowing}
        reviewId={id}
        closeModal={closeModal}
        handleLastPage={handleLastPage}
        openSnackbar={openSnackbar}
      />
    </>
  );
}
