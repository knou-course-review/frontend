"use client";

import { useEffect } from "react";
// import { Warning } from "@mui/icons-material";
// import { Button } from "@mui/material";
// import CourseInfo, { type CourseInfoProps } from "@/components/course/CourseInfo";
// import UserReview from "@/components/course/UserReview";

export default function CourseDetails({ params }: { params: { id: string } }) {
  // const [courseData, setCourseData] = useState<CourseInfoProps | null>();
  // const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const getCourseData = async () => {
      const fetchedCourse = await fetch(`/api/courses?id=${params.id}`);
      // const departmentId = fetchedCourse.departmentId.toString();
      // const professorId = fetchedCourse.professorId.toString();
      // const fetchedDepartment = await fetchData(`/api/departments?id=${departmentId}`);
      // const fetchedProfessor = await fetchData(`/api/departments?id=${professorId}`);
      // console.log(fetchedCourse);
      // console.log(fetchedDepartment);
      // console.log(fetchedProfessor);
      console.log(fetchedCourse);
      // setCourseData(fetchedCourse);
    };

    getCourseData();
  }, []);

  return (
    <div className="flex flex-col w-[950px] gap-4">
      {/* <CourseInfo {...courseData} />
      <div className="flex justify-between mt-8">
        <span>강의 후기 | 질의답변</span>
        <Button variant="contained">후기 등록</Button>
      </div>
      <div>
        <UserReview id={1} username="test" review="추천합니다" reviewDate="2024.08.01" />
      </div> */}
    </div>
  );
}
