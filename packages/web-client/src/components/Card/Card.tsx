import { Box, BoxProps, useColorMode } from "@chakra-ui/react";
import React, { useMemo } from "react";
import CardBody from "./components/CardBody";
import CardHeader from "./components/CardHeader";

type Props = BoxProps;

type CommonComponents = {
  Header: typeof CardHeader;
  Body: typeof CardBody;
};

const Card: React.FC<Props> & CommonComponents = (props) => {
  const { colorMode } = useColorMode();

  const bg = useMemo(
    () => (colorMode === "dark" ? "split" : "white"),
    [colorMode]
  );

  return (
    <Box bg={bg} borderRadius={4} boxShadow={"md"} borderWidth={1} {...props} />
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
