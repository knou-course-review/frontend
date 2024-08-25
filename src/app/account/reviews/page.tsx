import { Metadata } from "next";
import Divider from "@mui/material/Divider";
import MyReviewsContainer from "@/components/account/MyReviewsContainer";
import NavTabs from "@/components/nav/NavTabs";

export const metadata: Metadata = {
  title: "내가 쓴 리뷰 - 노우강",
};

export default function MyReviews() {
  return (
    <div className="flex flex-col">
      <NavTabs currentValue="my-reviews" />
      <div className="min-h-[500px] w-[90dvw] lg:w-[800px] lg:p-8 my-10 lg:my-0 lg:rounded-2xl lg:border lg:border-[#aab9e3] lg:dark:border-slate-600 lg:dark:bg-[#1d2945]">
        <h1 className="text-2xl font-bold">내가 쓴 리뷰</h1>
        <Divider sx={{ padding: "0.5rem" }} />
        <MyReviewsContainer />
      </div>
    </div>
  );
}
