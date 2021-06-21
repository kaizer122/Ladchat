import {
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { themeColors } from "../../../config/theme";
import UserAvatar from "../../UserAvatar";
interface ChatRowProps {
  title: string;
  message: string;
  avatarUrl: string;
  messageDate: number;
  seen: boolean;
  isOnline: boolean;
}
const ChatRow = ({
  title,
  message,
  messageDate,
  avatarUrl,
  isOnline,
  seen,
}: ChatRowProps) => {
  const borderColor = useColorModeValue(...themeColors.borderColor);
  const hoverColor = useColorModeValue(...themeColors.hoverColor);
  const primaryTextColor = useColorModeValue(...themeColors.primaryTextColor);
  const secondaryTextColor = useColorModeValue(
    ...themeColors.secondaryTextColor
  );
  const tertiaryTextColor = useColorModeValue(...themeColors.tertiaryTextColor);
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
    >
      <UserAvatar name={title} avatarUrl={avatarUrl} isOnline={isOnline} />
      <VStack
        overflow="hidden"
        flex={1}
        ml={3}
        spacing={0}
        alignItems="flex-start"
      >
        <Heading
          fontSize={12}
          w="full"
          fontWeight={seen ? "semibold" : "bold"}
          color={primaryTextColor}
        >
          {title}
        </Heading>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w="full"
          fontSize="xs"
          color={secondaryTextColor}
          fontWeight={seen ? "normal" : "bold"}
        >
          {message}
        </Text>
      </VStack>
      <Text ml={3} fontSize="xs" color={tertiaryTextColor}>
        {dayjs.tz(messageDate).fromNow()}
      </Text>
    </Flex>
  );
};

export default ChatRow;
