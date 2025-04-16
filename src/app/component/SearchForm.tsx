"use client";
import SearchFormReset from "../component/SearchFormReset";

import { useRouter } from "next/navigation";

const SearchForm = function ({ query }: { query?: string }) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevent page reload
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const searchQuery = formData.get("query");

    // ✅ Update URL without reloading
    router.push(`/?query=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="search startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white font-bold">
          s
        </button>
      </div>
    </form>
  );
};
export default SearchForm;
