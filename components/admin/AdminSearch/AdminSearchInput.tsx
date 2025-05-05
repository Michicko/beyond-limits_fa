import { Input } from "@chakra-ui/react";
import React from "react";

function AdminSearchInput({
  search,
  setSearch,
  name,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}) {
  return (
    <Input
      type="search"
      placeholder={`Search ${name}...`}
      px={"10px"}
      value={search}
      name={name}
      id={name}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default AdminSearchInput;
