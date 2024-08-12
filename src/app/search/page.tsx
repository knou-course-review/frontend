import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";

export type CourseSearchParams = {
  name: string;
  searchType: string;
};

type SearchPageProps = {
  searchParams: CourseSearchParams;
};

export default async function Search({ searchParams }: SearchPageProps) {
  return (
    <div className="flex flex-col items-center gap-10 w-200 py-32">
      <SearchBar defaultSearchInput={searchParams.name} />
      <div className="w-full">
        <SearchResults searchType={searchParams.searchType} name={searchParams.name} />
      </div>
    </div>
  );
}
