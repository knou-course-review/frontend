import CourseListContainer from "@/components/course/CourseListContainer";
import SearchBar from "@/components/search/SearchBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-200 gap-10 py-32">
      <SearchBar />
      <div className="w-full">
        <CourseListContainer />
      </div>
    </main>
  );
}
