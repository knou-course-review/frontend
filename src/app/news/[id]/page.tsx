import { getPostContent } from "@/lib/post";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지 - 노우강",
};

export default async function NewsPost({ params }: { params: { id: string } }) {
  const data = await getPostContent(params.id);
  return (
    <div className="w-[93dvw] min-h-[80dvh] xl:w-[950px] pt-10 pb-24 xl:py-24">
      <div className="mb-6">
        <h1 className="text-xl font-bold">{data.title}</h1>
        <span className="text-sm">{data.date}</span>
      </div>
      <div className="flex flex-col gap-4 blog-post" dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </div>
  );
}
