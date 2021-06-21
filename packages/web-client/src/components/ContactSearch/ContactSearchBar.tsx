import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { HiChat } from "react-icons/hi";
import { RiFileSearchFill } from "react-icons/ri";
import { useLayoutStore } from "../../stores/LayoutStore";
import ChatFilesDrawer from "../ChatFiles/ChatFilesDrawer";
import ChatHistoryDrawer from "../ChatHistory/ChatHistoryDrawer";
import SearchBar from "../SearchBar/SearchBar";
import SettingsMenu from "../SettingsMenu/SettingsMenu";

interface Props {
  onSearch: (search: string) => void;
}

const ContactSearchBar = ({ onSearch }: Props) => {
  const {
    isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose,
  } = useDisclosure();
  const {
    isOpen: isChatFilesOpen,
    onOpen: onChatFilesOpen,
    onClose: onChatFilesClose,
  } = useDisclosure();

  const toggleShowFiles = useLayoutStore((state) => state.toggleShowFiles);
  return (
    <>
      <HStack flexDirection="row" p={4}>
        <IconButton
          onClick={onChatHistoryOpen}
          variant="outline"
          display={{ base: "inherit", lg: "none" }}
          icon={<HiChat />}
          aria-label="Toggle Chat History Drawer"
        />
        <SearchBar onSearch={onSearch} placeholder={"Search for contacts"} />

        <IconButton
          onClick={onChatFilesOpen}
          variant="outline"
          display={{ base: "inherit", lg: "none" }}
          icon={<RiFileSearchFill />}
          aria-label="Toggle Chat Files Drawer"
        />
        <IconButton
          onClick={toggleShowFiles}
          variant="outline"
          display={{ base: "none", lg: "inherit" }}
          icon={<RiFileSearchFill />}
          aria-label="Toggle Chat Files Drawer"
        />
        <SettingsMenu />
      </HStack>

      <ChatHistoryDrawer
        isOpen={isChatHistoryOpen}
        onClose={onChatHistoryClose}
      />
      <ChatFilesDrawer isOpen={isChatFilesOpen} onClose={onChatFilesClose} />
    </>
  );
};

export default ContactSearchBar;
