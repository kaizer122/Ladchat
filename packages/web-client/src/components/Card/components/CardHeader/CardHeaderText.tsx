import { BoxProps, Text, useColorMode } from "@chakra-ui/react";
import React, { useMemo } from "react";

const CardHeaderText: React.FC<BoxProps> = (props) => {
  const { colorMode } = useColorMode();

  const color = useMemo(
    () => (colorMode === "dark" ? "gray.400" : "gray.500"),
    [colorMode]
  );

  return <Text fontSize="sm" color={color} {...props} />;
};

export default React.memo(CardHeaderText);
