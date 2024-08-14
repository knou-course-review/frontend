import CourseListContainer from "@/components/course/CourseListContainer";
import SearchBar from "@/components/search/SearchBar";

export default function Home() {
  return (
    <main className="flex flex-col w-[93dvw] xl:w-200 py-10 xl:py-32 gap-10 items-center">
      <SearchBar />
      <div className="w-full">
        <CourseListContainer />
      </div>
    </main>
  );
}
