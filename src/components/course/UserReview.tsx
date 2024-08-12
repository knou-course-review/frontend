"use client";

import { useEffect, useRef, useState } from "react";
import { AccountCircle, Warning } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import UserReportModal from "../UserReportModal";

type UserReviewProps = {
  id: number;
  username: string;
  content: string;
  createdAt: string;
};

const extractDate = (string: string) => {
  const array = string.split("T");
  return array[0];
};

export default function UserReview({ id, username, content, createdAt }: UserReviewProps) {
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

  return (
    <>
      <div className={`p-6 border border-neutral-400 rounded-2xl`}>
        <div className="flex justify-between">
          <div>
            <AccountCircle /> {username} <br />
            <span className="text-sm text-slate-400">{extractDate(createdAt)}</span>
          </div>
          <IconButton className="self-start">
            <Warning onClick={() => openModal()} />
          </IconButton>
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
      <UserReportModal isShowing={isShowing} userId={id} username={username} closeModal={closeModal} />
    </>
  );
}
