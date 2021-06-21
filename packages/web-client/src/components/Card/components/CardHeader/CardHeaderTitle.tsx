import { RepeatIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import React, { useMemo } from "react";
interface Props {
  onRefresh?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}
const CardHeaderTitle: React.FC<Props> = ({
  children,
  onRefresh,
  loading = true,
}) => {
  const { colorMode } = useColorMode();

  const color = useMemo(
    () => (colorMode === "dark" ? "gray.200" : "gray.800"),
    [colorMode]
  );

  return (
    <Flex justifyContent="space-between">
      <Text fontSize="1.4rem" fontWeight="light" color={color}>
        {children}
      </Text>
      {onRefresh !== undefined && (
        <IconButton
          icon={<RepeatIcon />}
          aria-label="refresh"
          onClick={onRefresh}
          isDisabled={loading}
          isRound={true}
          isLoading={loading}
        />
      )}
    </Flex>
  );
};

export default React.memo(CardHeaderTitle);
