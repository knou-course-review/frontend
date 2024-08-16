"use client";

import Close from "@mui/icons-material/Close";

type ModalFrameProps = {
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
};

export default function ModalFrame({ closeModal, title, children }: ModalFrameProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 grid place-content-center z-50">
      <div className="absolute w-full h-full opacity-50 dark:opacity-70 z-10 bg-black" onClick={closeModal} />
      <div className="relative max-w-[93dvw] lg:max-w-[50dvw] p-6 sm:p-10 rounded-2xl z-20 bg-white dark:bg-slate-600">
        <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
          <Close className="cursor-pointer" onClick={closeModal} />
        </div>
        <h1 className="text-xl font-bold mb-4 sm:mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
