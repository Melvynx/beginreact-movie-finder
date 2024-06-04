/* eslint-disable @next/next/no-img-element */
"use client";

import { Search } from "lucide-react";
import { useDebounceValue } from "./useDebounceValue";
import { useMovieQuery } from "./useMovieQuery";
import { useApiKeyRequired } from "./useOmdbApiKeyRequired";
import { useQueryState } from "./useQueryState";

export default function Home() {
  const [search, setSearch] = useQueryState("search", "");
  useApiKeyRequired();
  const debounceSearch = useDebounceValue(search, 500);
  const { data, error, isLoading } = useMovieQuery(debounceSearch);

  return (
    <div className="flex flex-col min-h-full py-8 gap-4 items-start m-auto max-w-3xl px-4">
      <h1 className="text-3xl font-bold text-center w-full">MoveFinder</h1>
      <fieldset className="border p-4 w-full rounded-lg border-neutral">
        <legend className="bg-base-100">Search</legend>
        <label class="input input-bordered flex items-center gap-2">
          <input
            type="text"
            class="grow"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-4 h-4 opacity-70" />
        </label>
      </fieldset>
      {error && <div>Error: {error.message}</div>}
      {search.length < 3 && <div>Please enter at least 3 characters</div>}
      {data?.Response === "False" && (
        <p>
          No results found for <span className="font-bold">"{search}"</span>
        </p>
      )}
      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4 w-full">
              <div className="w-full h-full object-cover rounded-md shadow aspect-[2/3] skeleton"></div>
              <div>
                <p className="text-sm font-medium h-5 skeleton w-1/2"></p>
                <p className="text-xs text-gray-500 h-4 skeleton mt-2 w-1/3"></p>
              </div>
            </div>
          ))}
        {data &&
          data.Search?.length > 0 &&
          data.Search.map((movie) => (
            <div key={movie.imdbID} className="flex flex-col gap-4">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover rounded-md shadow aspect-[2/3]"
              />
              <div>
                <p className="text-sm font-medium">{movie.Title}</p>
                <p className="text-xs text-gray-500">
                  {movie.Year} | {movie.Type}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
