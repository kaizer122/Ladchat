import { Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import ChatContainer from "../../components/Chat/ChatContainer";
import ChatFiles from "../../components/ChatFiles";
import ChatHistorySidebar from "../../components/ChatHistory/ChatHistorySidebar";
import ContactSearch from "../../components/ContactSearch/ContactSearch";
import { themeColors } from "../../config/theme";
// import Navigation from "../../components/Navigation";
import { useLayoutStore } from "../../stores/LayoutStore";

const HomePage = () => {
  const { showChat, showFiles } = useLayoutStore((state) => ({
    showChat: state.showChat,
    showFiles: state.showFiles,
  }));
  const borderColor = useColorModeValue(...themeColors.borderColor);

  return (
    <HStack h="100vh" spacing={0}>
      {/* <Flex as="nav" h="full" maxW={16} w="full" bg="gray.100">
        <Navigation />
      </Flex> */}
      <Flex
        as="aside"
        h="full"
        maxW={{ base: "xs", xl: "sm" }}
        display={{ base: "none", lg: "flex" }}
        w="full"
        borderRightColor={borderColor}
        borderRightWidth={1}
        pt={8}
      >
        <ChatHistorySidebar />
      </Flex>
      {showChat ? (
        <Flex
          as="main"
          h="full"
          flex={1}
          borderRightColor={borderColor}
          borderRightWidth={1}
        >
          <ChatContainer />
        </Flex>
      ) : (
        <ContactSearch />
      )}
      {showFiles && (
        <Flex
          as="aside"
          h="full"
          maxW={{ base: "xs", xl: "sm" }}
          display={{ base: "none", lg: "flex" }}
          w="full"
        >
          <ChatFiles />
        </Flex>
      )}
    </HStack>
  );
};

export default HomePage;
