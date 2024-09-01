import CourseListContainer from "@/components/course/CourseListContainer";
import SearchBar from "@/components/search/SearchBar";
import Banner240831 from "@/components/banners/Banner240831";

export default function Home({ searchParams }: { searchParams: { page?: string } }) {
  return (
    <main className="flex flex-col w-[93dvw] xl:w-200 py-10 xl:py-32 gap-10 items-center">
      <SearchBar defaultSearchInput="" />
      <div className="w-full">
        <CourseListContainer page={searchParams.page ?? "1"} />
      </div>
      <Banner240831 />
    </main>
  );
}
