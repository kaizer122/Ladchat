import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { themeColors } from "../../../config/theme";

const ConverationsLoader = () => {
  const borderColor = useColorModeValue(...themeColors.borderColor);

  return (
    <Box w="full" overflowY="auto">
      <VStack>
        {new Array(4).fill("").map((_, i) => (
          <Flex
            key={i}
            py={4}
            px={8}
            w="full"
            direction={"row"}
            alignItems="center"
            borderBottomColor={borderColor}
            borderBottomWidth={1}
          >
            <SkeletonCircle size="10" maxW={14} maxH={14} />
            <SkeletonText noOfLines={2} spacing="4" flex={1} p={2} />
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default ConverationsLoader;
