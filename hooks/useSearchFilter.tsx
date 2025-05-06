import { useState, useMemo } from "react";

type SearchableItem = Record<string, any>;

const useSearchFilter = <T extends SearchableItem>(list: T[], key: keyof T) => {
  const [search, setSearch] = useState("");

  const filteredList = useMemo(() => {
    if (!list) return;
    return list.filter((item) =>
      item[key]?.toString().toLowerCase().includes(search.toLowerCase()),
    );
  }, [list, key, search]);

  return {
    search,
    setSearch,
    filteredList,
  };
};

export default useSearchFilter;
