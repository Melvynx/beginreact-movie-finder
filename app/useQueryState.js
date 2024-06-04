import { useEffect, useState } from "react";

export const useQueryState = (queryKey, initialValue) => {
  const [queryState, setQueryState] = useState(initialValue);

  // Initialize the query state from the URL
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const query = search.get(queryKey);
    if (query !== null) {
      setQueryState(query);
    }
  }, [queryKey, initialValue]);

  // Update the query state when the URL changes
  useEffect(() => {
    if (queryState === initialValue) return;

    const params = new URLSearchParams(window.location.search);
    if (queryState === null) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, queryState);
    }
    const newURL = new URL(window.location);
    newURL.searchParams.set(queryKey, queryState);
    window.history.replaceState(null, "", newURL.toString());
  }, [initialValue, queryKey, queryState]);

  return [queryState, setQueryState];
};
