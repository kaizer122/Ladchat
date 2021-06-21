import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";

const ChatLoader = () => {
  return (
    <Box w="full" h="full" overflowY="hidden">
      {new Array(15).fill("").map((_, i) => (
        <VStack
          key={i}
          mt={6}
          alignItems={i % 2 ? "flex-end" : "flex-start"}
          alignSelf={i % 2 ? "flex-end" : "flex-start"}
        >
          <HStack
            d="flex"
            flexDirection={i % 2 ? "row-reverse" : "row"}
            alignItems="flex-end"
            w={"60%"}
            p={2}
          >
            <SkeletonCircle size="10" maxW={14} maxH={14} mx={2} />
            <Skeleton
              px={8}
              py={4}
              mx={2}
              w={"30%"}
              h={14}
              borderTopLeftRadius={32}
              borderTopRightRadius={32}
              borderBottomLeftRadius={i % 2 ? 32 : 0}
              borderBottomRightRadius={i % 2 ? 0 : 32}
            />
          </HStack>
        </VStack>
      ))}
    </Box>
  );
};

export default ChatLoader;
