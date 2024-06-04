import { useEffect } from "react";

export const useApiKeyRequired = () => {
  useEffect(() => {
    const storedApiKey = localStorage.getItem("omdbApiKey");

    if (storedApiKey) {
      return;
    }

    const text = prompt("Please enter your OMDB API Key");
    if (!text) return;

    setApiKey(text);
    localStorage.setItem("omdbApiKey", text);
  }, []);
};
