"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DraftContext } from "@/contexts/draft/DraftContextProvider";
import useThrottle from "@/hooks/useThrottle";

type NewReviewFormProps = {
  courseId: string;
  refreshData: () => void;
};

const CHAR_LIMIT = 255;

export default function NewReviewForm({ courseId, refreshData }: NewReviewFormProps) {
  const router = useRouter();
  const { getDraft, updateDraft } = useContext(DraftContext);
  const [content, setContent] = useState(getDraft(Number(courseId))?.content ?? "");
  const throttledValue = useThrottle(content, 2000);

  useEffect(() => {
    updateDraft(Number(courseId), content);
  }, [throttledValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > CHAR_LIMIT) {
      return;
    }
    setContent(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/reviews?cid=${courseId}`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      if (res.redirected) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
        return router.push("/login");
      }
      const body = await res.json();
      if (body.isSuccess) {
        setContent("");
        refreshData();
      } else throw Error("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-8">
        <Image src="/header-bar.svg" width={42} height={6} alt="수강생 리뷰 구간 표식" />
        <h1 className="mt-2 font-bold text-lg">내 리뷰 남기기</h1>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <TextField
          onChange={handleInput}
          value={content}
          name="content"
          placeholder="본 강의를 수강하셨나요? 리뷰를 남겨주세요!"
          multiline
          minRows={4}
          maxRows={10}
        />
        <div className="self-end">
          {content.length} / {CHAR_LIMIT}
          <Button className="ml-4 self-end" type="submit" variant="contained" disableElevation>
            리뷰 등록
          </Button>
        </div>
      </form>
    </div>
  );
}
