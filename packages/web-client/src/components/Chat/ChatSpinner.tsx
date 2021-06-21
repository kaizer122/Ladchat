import { Flex, Spinner } from "@chakra-ui/react";

const ChatSpinner = () => {
  return (
    <Flex w="full" h={"lg"} pos="relative">
      <Flex
        w="full"
        pos="absolute"
        top={0}
        my={2}
        justify="center"
        align="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      </Flex>
    </Flex>
  );
};

export default ChatSpinner;
