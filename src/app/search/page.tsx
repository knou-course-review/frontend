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
    <div className="flex flex-col w-[93dvw] xl:w-200 py-10 xl:py-32 gap-10 items-center">
      <SearchBar defaultSearchInput={searchParams.name} />
      <div className="w-full">
        <SearchResults searchType={searchParams.searchType} name={searchParams.name} />
      </div>
    </div>
  );
}
