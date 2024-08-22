"use client";

import { useEffect, useRef, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import Warning from "@mui/icons-material/Warning";
import UserReportModal from "../modals/UserReportModal";
import { cancelLike, likeReview } from "@/actions/like-review";
import type { UserReviewData } from "../course/CourseReviewContainer";

type UserReviewProps = UserReviewData & {
  refreshData: () => void;
  openSnackbar: (msg: string) => void;
};

const extractDate = (string: string) => {
  const array = string.split("T");
  return array[0];
};

export default function UserReview({
  id,
  userId,
  username,
  content,
  createdAt,
  owner,
  likeStatus,
  openSnackbar,
  refreshData,
}: UserReviewProps) {
  const contentElem = useRef<HTMLParagraphElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isExpandable, setIsExpandable] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (!contentElem.current) return;
    const contentHeight = contentElem.current.scrollHeight;
    if (contentHeight > 120) setIsExpandable(true);
  }, []);

  const handleExpand = () => {
    setIsCollapsed(false);
    setIsExpandable(false);
  };
  const openModal = () => setIsShowing(true);
  const closeModal = () => setIsShowing(false);
  const handleReviewLike = async () => {
    const res = await likeReview(id.toString());
    if (res.isValid) refreshData();
    else openSnackbar("오류가 발생했습니다.");
  };
  const handleReviewCancel = async () => {
    const res = await cancelLike(id.toString());
    if (res.isValid) refreshData();
    else openSnackbar("오류가 발생했습니다.");
  };

  return (
    <>
      <div
        className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#aab9e3] dark:bg-[#1d2945] dark:border-slate-600`}
      >
        <div className="flex justify-between">
          <div>
            <AccountCircle fontSize="small" /> {username} <br />
            <span className="text-sm text-slate-400">{extractDate(createdAt)}</span>
          </div>
          <div className="flex justify-end">
            {likeStatus.isLike ? (
              <ThumbUpAlt className="cursor-pointer" fontSize="small" onClick={handleReviewCancel} />
            ) : (
              <ThumbUpOffAlt className="cursor-pointer" fontSize="small" onClick={handleReviewLike} />
            )}
            <div className="ml-1 leading-5">{likeStatus.likeCount.toLocaleString("ko-KR")}</div>
            {!owner && <Warning className="ml-4 cursor-pointer" fontSize="small" onClick={() => openModal()} />}
          </div>
        </div>
        <div className={`relative mt-4 whitespace-pre-line overflow-hidden ${isCollapsed && "max-h-[120px]"}`}>
          <p ref={contentElem}>{content}</p>
        </div>
        {isExpandable && (
          <div onClick={handleExpand}>
            ... <span className="text-cyan-600 cursor-pointer">더보기</span>
          </div>
        )}
      </div>
      {!owner && (
        <UserReportModal
          isShowing={isShowing}
          reviewId={id}
          username={username}
          closeModal={closeModal}
          openSnackbar={openSnackbar}
        />
      )}
    </>
  );
}
