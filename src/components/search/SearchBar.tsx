"use client";

import { useRouter } from "next/navigation";
import Search from "@mui/icons-material/Search";
import { IconButton, MenuItem, Select, TextField } from "@mui/material";
import type { FormEvent } from "react";

const searchPlaceholder = "강의, 학과 또는 교수님을 검색해 보세요.";

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name");
    const searchType = formData.get("searchType");
    router.push(`/search?searchType=${searchType}&name=${name}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <Select name="searchType" size="small" defaultValue="courseName" autoWidth>
        <MenuItem value="courseName">강의 검색</MenuItem>
        <MenuItem value="departmentName">학과 검색</MenuItem>
        <MenuItem value="professorName">교수 검색</MenuItem>
      </Select>
      <TextField
        variant="standard"
        name="name"
        placeholder={searchPlaceholder}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton type="submit">
              <Search />
            </IconButton>
          ),
        }}
      />
    </form>
  );
}
