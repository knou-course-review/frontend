import PostTable from "@/components/news/PostTable";
import { getPosts } from "@/lib/post";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지 - 노우강",
};

export default async function News() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col w-[93dvw] min-h-[80dvh] xl:w-[950px] pt-10 pb-24 xl:py-24 gap-4">
      <h1 className="text-xl sm:text-2xl font-bold">공지</h1>
      <PostTable posts={posts} />
    </div>
  );
}
