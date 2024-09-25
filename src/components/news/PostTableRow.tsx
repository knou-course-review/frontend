import Link from "next/link";

export type PostTableRowProps = {
  postData: {
    id: string;
    title: string;
    date: string;
  };
};

export default function PostTableRow({ postData }: PostTableRowProps) {
  return (
    <tr className="text-sm sm:text-base border-b border-neutral-400">
      <td className="p-1 line-clamp-1">
        <Link href={`/news/${postData.id}`}>{postData.title}</Link>
      </td>
      <td className="p-1">{postData.date}</td>
    </tr>
  );
}
