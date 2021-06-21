import { Box, Heading, Input } from "@chakra-ui/react";

interface Props {
  disabled: boolean;
}

const ConversationsSearch = ({ disabled }: Props) => {
  return (
    <Box px={8} w="full">
      <Heading size="xs" w="full">
        Chats
      </Heading>
      <Input
        {...disabled}
        variant="filled"
        mt={2}
        minH={10}
        rounded="full"
        placeholder="Search chat"
      />
    </Box>
  );
};

export default ConversationsSearch;
