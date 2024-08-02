"use client";

import { Warning } from "@mui/icons-material";
import { Button } from "@mui/material";
import CourseInfo from "@/components/course/CourseInfo";
import UserReview from "@/components/course/UserReview";
import { MOCK_COURSES } from "@/constants/mockdata";

export default function CourseDetails({ params }: { params: { id: string } }) {
  // params.id로 API fetch
  const MOCK_DATA = MOCK_COURSES.find((course) => course.id === Number(params.id));
  if (!MOCK_DATA)
    return (
      <div className="flex flex-col gap-4 text-center">
        <p>
          <Warning /> 404
        </p>
        <p>[{params.id}] id를 가진 강의의 정보가 mock 데이터에 존재하지 않습니다.</p>
      </div>
    );
  return (
    <div className="flex flex-col w-[950px] gap-4">
      <CourseInfo {...MOCK_DATA} />
      <div className="flex justify-between mt-8">
        <span>강의 후기 | 질의답변</span>
        <Button variant="contained">후기 등록</Button>
      </div>
      <div>
        <UserReview id={1} username="test" review="추천합니다" reviewDate="2024.08.01" />
      </div>
    </div>
  );
}
