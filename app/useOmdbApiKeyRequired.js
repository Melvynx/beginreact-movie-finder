import { useEffect, useState } from "react";

export const useApiKeyRequired = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (apiKey) return;

    const storedApiKey = localStorage.getItem("omdbApiKey");

    if (storedApiKey) {
      setApiKey(storedApiKey);
      return;
    }

    const text = prompt("Please enter your OMDB API Key");
    if (!text) return;

    setApiKey(text);
    localStorage.setItem("omdbApiKey", text);
  }, [apiKey, setApiKey]);

  return apiKey;
};
