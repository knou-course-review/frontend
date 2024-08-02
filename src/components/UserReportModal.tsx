"use client";

import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ModalFrame from "./ModalFrame";
import { ChangeEvent, useState } from "react";

type UserReportModalProps = {
  isShowing: boolean;
  username: string;
  userId: number;
  closeModal: () => void;
};

const REPORT_FORM_LABELS = {
  language: "욕설, 비속어 등 부적절한 언어",
  spam: "스팸, 광고성 및 기타 무관한 내용 또는 상업용 컨텐츠",
  defamation: "인신공격 또는 비방",
};

export default function UserReportModal({ isShowing, username, userId, closeModal }: UserReportModalProps) {
  const [option, setOption] = useState<null | string>(null);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.value;
    setOption(newSelection);
  };
  const handleReport = () => {
    if (!option) return alert("사유를 선택해 주세요.");
    // Request to server
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="유저 신고하기" closeModal={closeModal}>
      <div className="flex flex-col gap-4 px-4">
        <p>{username} 유저를 신고합니다. 아래 신고 사유를 선택해 주세요.</p>
        <RadioGroup value={option} onChange={handleSelect}>
          <FormControlLabel value="language" control={<Radio />} label={REPORT_FORM_LABELS.language} />
          <FormControlLabel value="spam" control={<Radio />} label={REPORT_FORM_LABELS.spam} />
          <FormControlLabel value="defamation" control={<Radio />} label={REPORT_FORM_LABELS.defamation} />
        </RadioGroup>
        <Button variant="contained" fullWidth onClick={handleReport}>
          신고하기
        </Button>
      </div>
    </ModalFrame>
  );
}
