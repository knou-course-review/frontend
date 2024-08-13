"use client";

import { type FormEvent } from "react";
import { Button, TextField } from "@mui/material";

type EditReviewFormProps = {
  courseId: string;
  oldContent: string;
  closeModal: () => void;
  refreshData: () => void;
};

export default function EditReviewForm({ courseId, oldContent, closeModal, refreshData }: EditReviewFormProps) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const content = formData.get("content");

    try {
      const res = await fetch(`/api/reviews?cid=${courseId}`, {
        method: "PUT",
        body: JSON.stringify({ content }),
      });
      const body = await res.json();
      if (body.isSuccess) {
        refreshData();
        closeModal();
      } else throw Error("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full h-fit" onSubmit={handleSubmit}>
      <TextField defaultValue={oldContent} name="content" multiline minRows={4} maxRows={10} />
      <div className="self-end">
        <Button onClick={closeModal}>취소</Button>{" "}
        <Button type="submit" variant="contained" disableElevation>
          수정
        </Button>
      </div>
    </form>
  );
}
