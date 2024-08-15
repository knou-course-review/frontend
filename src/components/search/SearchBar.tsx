"use client";

import { useRouter } from "next/navigation";
import Search from "@mui/icons-material/Search";
import { IconButton, MenuItem, Select, TextField } from "@mui/material";

const searchPlaceholder = "내가 찾는 강의";

export default function SearchBar({ defaultSearchInput }: { defaultSearchInput?: string }) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
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
        <MenuItem value="courseName">강의</MenuItem>
        <MenuItem value="departmentName">학과</MenuItem>
        <MenuItem value="professorName">교수</MenuItem>
      </Select>
      <TextField
        variant="standard"
        name="name"
        defaultValue={defaultSearchInput}
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
