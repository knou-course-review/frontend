"use client";

import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ModalFrame from "./ModalFrame";
import { reportUser } from "@/actions/report-user";

type UserReportModalProps = {
  isShowing: boolean;
  username: string;
  reviewId: number;
  closeModal: () => void;
  openSnackbar: (msg: string) => void;
};

const REPORT_REASONS = {
  language: "욕설 등 폭력적이거나 부적절한 언어",
  spam: "스팸, 광고성 컨텐츠 및 서비스와 무관한 내용",
  harassment: "인신공격, 비방 또는 차별 등을 통한 분쟁 조성",
  violation: "기타 서비스 이용약관 및 법률을 위반하는 내용",
};

export default function UserReportModal({
  isShowing,
  username,
  reviewId,
  closeModal,
  openSnackbar,
}: UserReportModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const value = formData.get("reason");

    if (!value) return alert("신고 사유를 선택해 주세요.");
    postReport(value as string);
  };

  const postReport = async (content: string) => {
    const res = await reportUser(reviewId.toString(), { content });
    if (res.isValid) openSnackbar("신고가 접수되었습니다.");
    else alert("오류가 발생했습니다 잠시 후 다시 시도해 주세요.");
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="리뷰 신고하기" closeModal={closeModal}>
      <form className="flex flex-col px-4 sm:px-6 gap-4" onSubmit={handleSubmit}>
        <p className="text-center">
          작성자 {username}의 리뷰를 신고합니다.
          <br />
          아래 신고 사유를 선택해 주세요.
        </p>
        <RadioGroup name="reason">
          <FormControlLabel
            value={REPORT_REASONS.language}
            label={REPORT_REASONS.language}
            control={<Radio size="small" />}
          />
          <FormControlLabel value={REPORT_REASONS.spam} label={REPORT_REASONS.spam} control={<Radio size="small" />} />
          <FormControlLabel
            value={REPORT_REASONS.harassment}
            label={REPORT_REASONS.harassment}
            control={<Radio size="small" />}
          />
          <FormControlLabel
            value={REPORT_REASONS.violation}
            label={REPORT_REASONS.violation}
            control={<Radio size="small" />}
          />
        </RadioGroup>
        <Button type="submit" variant="contained" className="w-36 self-center" disableElevation>
          신고하기
        </Button>
      </form>
    </ModalFrame>
  );
}
