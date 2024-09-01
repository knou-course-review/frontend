import NoResults from "@/components/search/NoResults";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import { SearchSchema } from "@/schema/search";

export type CourseSearchParams = {
  name: string;
  searchType: string;
  page: string;
};

type SearchPageProps = {
  searchParams: CourseSearchParams;
};

export default async function Search({ searchParams }: SearchPageProps) {
  const validatedSearch = SearchSchema.safeParse(searchParams);
  return (
    <div className="flex flex-col w-[93dvw] xl:w-200 py-10 xl:py-32 gap-10 items-center">
      <SearchBar defaultSearchInput={searchParams.name} defaultSearchType={searchParams.searchType} />
      <div className="w-full">
        {validatedSearch.success ? (
          <SearchResults searchType={searchParams.searchType} name={searchParams.name} page={searchParams.page} />
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}
