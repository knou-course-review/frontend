import PostTableRow from "@/components/news/PostTableRow";

type DepartmentTableProps = {
  posts: Array<{
    id: string;
    title: string;
    date: string;
  }>;
};

export default function PostTable({ posts }: DepartmentTableProps) {
  return (
    <>
      <table className="table-fixed w-full text-center">
        <thead>
          <tr className="text-sm sm:text-base font-bold bg-neutral-300 dark:bg-neutral-700">
            <td className="p-2">제목</td>
            <td className="w-24 sm:w-52">작성일</td>
          </tr>
        </thead>
        <tbody>{posts.length > 0 && posts.map((data) => <PostTableRow key={data.id} postData={{ ...data }} />)}</tbody>
      </table>
      {posts.length < 1 && <span className="text-sm sm:text-base text-center">작성된 공지글이 없습니다.</span>}
    </>
  );
}
