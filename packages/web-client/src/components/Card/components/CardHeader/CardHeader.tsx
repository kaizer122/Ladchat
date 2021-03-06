import { Box, BoxProps } from "@chakra-ui/react";
import CardHeaderText from "./CardHeaderText";
import CardHeaderTitle from "./CardHeaderTitle";

type CommonComponents = {
  Text: typeof CardHeaderText;
  Title: typeof CardHeaderTitle;
};

const CardHeader: React.FC<BoxProps> & CommonComponents = (props) => (
  <Box py={4} px={4} {...props} />
);

CardHeader.Text = CardHeaderText;
CardHeader.Title = CardHeaderTitle;

export default CardHeader;
