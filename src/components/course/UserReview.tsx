"use client";

import { useState } from "react";
import { AccountCircle, Warning } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import UserReportModal from "../UserReportModal";

type UserReviewProps = {
  id: number;
  username: string;
  review: string;
  reviewDate: string;
};

export default function UserReview({ id, username, review, reviewDate }: UserReviewProps) {
  const [isShowing, setIsShowing] = useState(false);
  const openModal = () => {
    setIsShowing(true);
  };
  const closeModal = () => setIsShowing(false);
  return (
    <>
      <div className="p-6 border border-neutral-400 rounded-2xl flex flex-col justify-between h-48">
        <div className="flex justify-between">
          <div>
            <AccountCircle /> {username} <br />
            <span>{reviewDate}</span>
          </div>
          <IconButton className="self-start">
            <Warning onClick={() => openModal()} />
          </IconButton>
        </div>
        <p>{review}</p>
      </div>
      <UserReportModal isShowing={isShowing} userId={id} username={username} closeModal={closeModal} />
    </>
  );
}
