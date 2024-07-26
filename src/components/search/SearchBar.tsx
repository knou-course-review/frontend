"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";

const searchPlaceholder = "강의, 학과 또는 교수님을 검색해보세요.";

export default function SearchBar() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > 50) return;
    setInput(input);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    if (input === "") return;
    router.push(`/search?query=${input}`); // 엔드포인트 미정
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <TextField
        variant="standard"
        value={input}
        onChange={handleInput}
        placeholder={searchPlaceholder}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          ),
        }}
      />
    </form>
  );
}
