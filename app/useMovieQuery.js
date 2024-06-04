export const useMovieQuery = (search) => {
  return useSWR(search, async () => {
    if (search.length < 3) {
      throw new Error("Please enter at least 3 characters");
    }

    const apiKey = localStorage.getItem("omdbApiKey");
    if (!apiKey) {
      throw new Error("Please enter your OMDB API Key");
    }

    const url = new URL("http://www.omdbapi.com");
    url.searchParams.set("s", search);
    url.searchParams.set("apikey", apiKey);

    const res = await fetch(url.toString());
    return await res.json();
  });
};
