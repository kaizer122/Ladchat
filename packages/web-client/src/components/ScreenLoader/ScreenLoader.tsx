import { Box, Flex, Spinner, useColorMode } from "@chakra-ui/react";
import React, { useMemo } from "react";
import Card from "../Card";

const ScreenLoader: React.FC = () => {
  const { colorMode } = useColorMode();
  const cardBg = useMemo(
    () => (colorMode === "dark" ? "split" : "white"),
    [colorMode]
  );
  const color = useMemo(
    () => (colorMode === "dark" ? "white" : "split"),
    [colorMode]
  );
  return (
    <Card
      minH="80vh"
      width="full"
      height="full"
      d="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor={cardBg}
    >
      <Box
        bg={"white"}
        borderRadius={20}
        borderWidth={1}
        boxShadow="lg"
        w="300px"
        h="300px"
        alignContent="center"
        justifyContent="center"
        p={8}
        backgroundColor={color}
      >
        <Flex
          width="full"
          height="full"
          align="center"
          justify="center"
          direction="column"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            color={cardBg}
            size="xl"
            emptyColor="gray.200"
          />
        </Flex>
      </Box>
    </Card>
  );
};
export default ScreenLoader;
