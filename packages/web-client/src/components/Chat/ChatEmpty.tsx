import { Flex, Text } from "@chakra-ui/react";

const ChatEmpty = () => {
  return (
    <Flex
      width="full"
      height="full"
      alignItems={"flex-end"}
      justifyContent="center"
      p={4}
    >
      <Text fontSize="sm" color="gray" textAlign="center">
        No messages, yet!
      </Text>
    </Flex>
  );
};

export default ChatEmpty;
