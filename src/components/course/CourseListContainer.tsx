"use client";

import { useEffect, useState } from "react";
import CoursePreview, { type CoursePreviewProps } from "./CoursePreview";

export default function CourseListContainer() {
  const [courses, setCourses] = useState<CoursePreviewProps[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setCourses(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCourses();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {courses.map((course) => (
        <CoursePreview key={course.id} {...course} />
      ))}
    </div>
  );
}
