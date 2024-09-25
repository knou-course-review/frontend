import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

type PostData = {
  id: string;
  date: string;
  title: string;
};

type PostContent = PostData & {
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "news");

export async function getSortedPosts(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  console.log(fileNames);
  const allPosts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    console.log(fileContents);
    const matterResult = matter(fileContents);
    return { id, ...matterResult.data } as PostData;
  });
  return allPosts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostContent(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  console.log(fileContents);
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as PostContent;
}
