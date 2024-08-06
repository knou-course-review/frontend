import CourseListContainer from "@/components/course/CourseListContainer";
import SearchBar from "@/components/search/SearchBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-200 gap-10 py-32">
      <SearchBar />
      <div className="w-full flex flex-col gap-3">
        <CourseListContainer />
      </div>
    </main>
  );
}
