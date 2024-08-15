"use client";

import { useEffect, useRef, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Warning from "@mui/icons-material/Warning";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReviewForm from "./EditReviewForm";
import UserReportModal from "../UserReportModal";

type UserReviewProps = {
  id: number;
  userId: number;
  username: string;
  content: string;
  createdAt: string;
  owner: boolean;
  refreshData: () => void;
  handleLastPage: () => void;
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
  refreshData,
  handleLastPage,
}: UserReviewProps) {
  const contentElem = useRef<HTMLParagraphElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isExpandable, setIsExpandable] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-400`}>
        <div className="flex justify-between">
          <div>
            <AccountCircle fontSize="small" /> {username} <br />
            <span className="text-sm text-slate-400">{extractDate(createdAt)}</span>
          </div>
          {owner ? (
            <div className="self-start">
              <Edit className="cursor-pointer" onClick={toggleEditMode} />{" "}
              <Delete className="cursor-pointer" onClick={() => openModal()} />
            </div>
          ) : (
            <Warning className="self-start cursor-pointer" onClick={() => openModal()} />
          )}
        </div>
        <div className={`relative mt-4 whitespace-pre-line overflow-hidden ${isCollapsed && "max-h-[120px]"}`}>
          {isEditing ? (
            <EditReviewForm
              courseId={id.toString()}
              oldContent={content}
              closeModal={toggleEditMode}
              refreshData={refreshData}
            />
          ) : (
            <p ref={contentElem}>{content}</p>
          )}
        </div>
        {isExpandable && !isEditing && (
          <div onClick={handleExpand}>
            ... <span className="text-cyan-600 cursor-pointer">더보기</span>
          </div>
        )}
      </div>
      {owner ? (
        <DeleteReviewModal
          isShowing={isShowing}
          reviewId={id}
          closeModal={closeModal}
          handleLastPage={handleLastPage}
        />
      ) : (
        <UserReportModal isShowing={isShowing} userId={userId} username={username} closeModal={closeModal} />
      )}
    </>
  );
}
