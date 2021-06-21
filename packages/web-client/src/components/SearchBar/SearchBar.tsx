import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useDebouncedState } from "../../hooks";

interface Props {
  placeholder: string;
  onSearch: (search: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: Props) => {
  const [searchValue, setSearchValue] = useDebouncedState<string>("", {
    wait: 500,
  });
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  const onClear = () => {
    setInputValue("");
    setSearchValue("", true);
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value !== "") {
      setInputValue(e.target.value);
      setSearchValue(e.target.value);
    } else onClear();
  };

  const onIconClick = () => {
    if (inputValue && inputValue.trim().length > 0) onClear();
    else setSearchValue(inputValue, true);
  };

  return (
    <InputGroup size="md">
      <Input
        variant="filled"
        minH={10}
        rounded="full"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={onValueChange}
      />
      <InputRightElement>
        <IconButton
          size="sm"
          rounded="full"
          mr={2}
          aria-label=""
          onClick={onIconClick}
          icon={
            searchValue && searchValue.trim().length > 0 ? (
              <FiX />
            ) : (
              <FiSearch />
            )
          }
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
