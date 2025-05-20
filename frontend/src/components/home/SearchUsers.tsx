// import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import useGetSearch from "@/hooks/user/useGetSearch";
import { useEffect, useRef, useState } from "react";
import SearchList from "./SearchList";

const SearchUsers = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [open, setOpen] = useState(false);

  const { data, isLoading, isFetching, error } = useGetSearch({
    query: debouncedQuery,
  });

  useEffect(() => {
    if (query.length === 0) {
      setDebouncedQuery("");
      setOpen(false);
      return;
    }
    setOpen(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
      setOpen(false);
    };
  }, [query]);

  // Close the search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <aside className="flex flex-col items-center justify-center mb-4 relative">
      <div
        ref={searchContainerRef}
        className="flex items-center gap-2
        px-4 py-1.5 rounded-xl 
       w-full border focus:ring-1 focus:ring-blue-400! focus:border-0"
      >
        <Search className="h-4 w-4 text-gray-500 dark:text-gray-50" />
        <Input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          autoComplete="off new-password"
          placeholder="Search for users..."
          className="w-full placeholder:text-lg border-0 outline-0 focus:ring-0! focus:border-0"
        />
      </div>

      {open && (
        <div
          ref={containerRef}
          className="absolute top-full mt-2 left-0 right-0 bg-white  dark:bg-gray-950 
      shadow-lg rounded-xl w-full max-h-[300px] z-10 overflow-y-auto scrollbar-hide pb-10 border border-gray-200 dark:border-gray-700"
        >
          <SearchList
            users={data?.users || []}
            isLoading={isLoading || isFetching}
            error={error}
          />
        </div>
      )}
    </aside>
  );
};

export default SearchUsers;
