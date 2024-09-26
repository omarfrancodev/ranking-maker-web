import { useEffect, useState } from "react";

function getInitialState(query, defaultState) {
  if (defaultState !== undefined) {
    return defaultState;
  }
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }
  return false;
}

export default function useMedia(query, defaultState) {
  const [matches, setMatches] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = () => setMatches(!!mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
