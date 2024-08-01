"use client";

import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CourseListContainer from "@/components/course/CourseListContainer";
import SearchBar from "@/components/search/SearchBar";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("과목명순");

  return (
    <main className="flex flex-col items-center justify-between w-200 gap-10 py-32">
      <SearchBar />
      <div className="w-full flex flex-col gap-3">
        <div className="w-36 self-end">
          <Select size="small" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} fullWidth>
            <MenuItem value={"과목명순"}>과목명순</MenuItem>
            <MenuItem value={"평점순"}>평점순 (미정)</MenuItem>
          </Select>
        </div>
        <CourseListContainer />
      </div>
    </main>
  );
}
