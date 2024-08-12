"use client";

import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ModalFrame from "./ModalFrame";
import { reportUser } from "@/actions/report-user";
import type { FormEvent } from "react";

type UserReportModalProps = {
  isShowing: boolean;
  username: string;
  userId: number;
  closeModal: () => void;
};

const REPORT_REASONS = {
  language: "욕설, 비속어 등 부적절한 언어",
  spam: "스팸, 광고성 및 기타 무관한 내용 또는 상업용 컨텐츠",
  defamation: "인신공격 또는 비방",
};

export default function UserReportModal({ isShowing, username, userId, closeModal }: UserReportModalProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const value = formData.get("reason");

    if (!value) return alert("신고 사유를 선택해 주세요.");
    postReport(value as string);
  };

  const postReport = async (content: string) => {
    const res = await reportUser(userId.toString(), { content });
    if (res.isValid) {
      alert("신고해주셔서 감사합니다.");
    } else alert("에러가 발생했습니다 잠시 후 다시 시도해 주세요.");
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="유저 신고하기" closeModal={closeModal}>
      <div className="flex flex-col gap-4 px-4">
        <p>{username} 유저를 신고합니다. 아래 신고 사유를 선택해 주세요.</p>
        <form onSubmit={handleSubmit}>
          <RadioGroup name="reason">
            <FormControlLabel value={REPORT_REASONS.language} label={REPORT_REASONS.language} control={<Radio />} />
            <FormControlLabel value={REPORT_REASONS.spam} label={REPORT_REASONS.spam} control={<Radio />} />
            <FormControlLabel value={REPORT_REASONS.defamation} label={REPORT_REASONS.defamation} control={<Radio />} />
          </RadioGroup>
          <Button type="submit" variant="contained" fullWidth disableElevation>
            신고하기
          </Button>
        </form>
      </div>
    </ModalFrame>
  );
}
