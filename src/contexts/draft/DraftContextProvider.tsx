"use client";

import { type ReactNode, useState, createContext, useCallback } from "react";

export type DraftContextState = {
  getDraft: (courseId: number) => Draft | undefined;
  updateDraft: (courseId: number, content: string) => void;
};

export type Draft = {
  courseId: number;
  content: string;
};

export const DraftContext = createContext<DraftContextState>({
  getDraft: () => undefined,
  updateDraft: () => {},
});

export const DraftContextProvider = ({ children }: { children: ReactNode }) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const updateDraft = useCallback(
    (courseId: number, content: string) => {
      setDrafts((prev) => {
        const filteredList = prev.filter((draft) => draft.courseId !== courseId);
        return [...filteredList, { courseId, content }];
      });
    },
    [drafts]
  );
  const getDraft = useCallback(
    (courseId: number) => drafts.filter((draft) => draft.courseId === courseId)[0],
    [drafts]
  );
  return <DraftContext.Provider value={{ getDraft, updateDraft }}>{children}</DraftContext.Provider>;
};
