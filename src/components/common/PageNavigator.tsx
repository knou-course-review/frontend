"use client";

import { useEffect, useMemo, useState } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";

type PageNavigatorProps = {
  currentPage: number;
  pages: number;
  handlePageSelect: (value?: string) => void;
};

const commonClasses = "text-center w-8 h-8 leading-8 rounded-[50px]";
const disabledClasses = "bg-slate-300 cursor-default dark:[color:rgb(52,52,52)]";
const activeClasses = "bg-transparent cursor-pointer hover:bg-sky-300 dark:hover:[color:rgb(52,52,52)]";

const getButtonArray = (totalBatches: number, currentBatch: number, totalPages: number) =>
  Array.from(
    { length: currentBatch < totalBatches ? 5 : totalPages % 5 === 0 ? 5 : totalPages % 5 },
    (_, i) => i + (currentBatch - 1) * 5 + 1
  );

const getBatches = (pages: number) => {
  if (pages === 0) return [];
  const array = Array.from({ length: Math.ceil(pages / 5) });
  const batches = array.reduce<Array<number[]>>((acc, _, i) => {
    const buttonArray = getButtonArray(array.length, i + 1, pages);
    return [...acc, buttonArray];
  }, []);
  return batches;
};

export default function PageNavigator({ currentPage, pages, handlePageSelect }: PageNavigatorProps) {
  const batches = useMemo(() => getBatches(pages), [pages]);
  const [currentBatch, setCurrentBatch] = useState(batches.findIndex((batch) => batch.includes(currentPage)) + 1);

  useEffect(() => {
    if (currentBatch < 1 || batches[currentBatch - 1]?.includes(currentPage)) return;
    handlePageSelect(batches[currentBatch - 1][0].toString());
  }, [currentBatch]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const nextPage = target.textContent;
    handlePageSelect(nextPage || undefined);
  };

  const getBatch = (key: string) => {
    switch (key) {
      case "prev":
        return setCurrentBatch((prev) => prev - 1);
      case "next":
        return setCurrentBatch((prev) => prev + 1);
      case "first":
        return setCurrentBatch(1);
      case "last":
        return setCurrentBatch(batches.length);
    }
  };

  if (pages === 0) return null;
  return (
    <div className="flex justify-center gap-2 mt-4 items-center">
      <IconButton onClick={() => getBatch("first")} disabled={currentBatch === 1}>
        <KeyboardDoubleArrowLeft color={currentBatch === 1 ? "disabled" : "primary"} />
      </IconButton>
      <IconButton onClick={() => getBatch("prev")} disabled={currentBatch === 1}>
        <ChevronLeft color={currentBatch === 1 ? "disabled" : "primary"} />
      </IconButton>
      {batches[currentBatch - 1].map((page) => (
        <div
          className={`${commonClasses} ${page == currentPage ? disabledClasses : activeClasses}`}
          key={page}
          onClick={handleClick}
        >
          {page}
        </div>
      ))}
      <IconButton onClick={() => getBatch("next")} disabled={currentBatch === batches.length}>
        <ChevronRight color={currentBatch === batches.length ? "disabled" : "primary"} />
      </IconButton>
      <IconButton onClick={() => getBatch("last")} disabled={currentBatch === batches.length}>
        <KeyboardDoubleArrowRight color={currentBatch === batches.length ? "disabled" : "primary"} />
      </IconButton>
    </div>
  );
}
