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

const postsDirectory = path.join(process.cwd(), "news");

export function getSortedPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    return { id, ...matterResult.data } as PostData;
  });
  return allPosts.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getPostContent(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
