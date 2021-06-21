import { Box, BoxProps } from "@chakra-ui/react";
import { memo } from "react";

const CardBody: React.FC<BoxProps> = (props) => (
  <Box py={4} px={4} {...props} />
);

export default memo(CardBody);
