import {
  Flex,
  FlexProps,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { themeColors } from "../../config/theme";
import { SearchContactsResponse } from "../../graphql";
import UserAvatar from "../UserAvatar";
interface Props {
  user: SearchContactsResponse;
}

const SearchResultItem = ({
  user: { fullName, isOnline, avatarUrl, conversationId },
  ...rest
}: Props & FlexProps) => {
  const borderColor = useColorModeValue(...themeColors.borderColor);
  const hoverColor = useColorModeValue(...themeColors.hoverColor);

  return (
    <Flex
      py={4}
      px={8}
      w="full"
      alignItems="center"
      borderBottomColor={borderColor}
      borderBottomWidth={1}
      style={{ transition: "background 300ms" }}
      _hover={{ bg: hoverColor, cursor: "pointer" }}
      {...rest}
    >
      <UserAvatar isOnline={isOnline} name={fullName} avatarUrl={avatarUrl} />
      <Heading fontSize={12}>{fullName}</Heading>

      <Icon
        as={conversationId ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine}
        color="green.200"
        pl={1}
      />
    </Flex>
  );
};

export default SearchResultItem;
