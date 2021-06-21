import { Flex, Text } from "@chakra-ui/react";

interface Props {
  emptyMessage: string;
}

const Empty = ({ emptyMessage }: Props) => {
  return (
    <Flex w={"full"} height="full" justify="center" align="center" px={2}>
      <Text size="md" color="gray.600">
        {emptyMessage}
      </Text>
    </Flex>
  );
};
export default Empty;
