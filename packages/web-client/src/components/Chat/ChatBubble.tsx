import {
  Box,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { themeColors } from "../../config/theme";
import { User } from "../../graphql";
import UserAvatar from "../UserAvatar";

type Props = {
  message: string;
  dateSent: string;
  isSender: boolean;
  sender: User;
  showAvatar: boolean;
  showDate: boolean;
};

const ChatBubble = ({
  message,
  dateSent,
  isSender,
  sender,
  showAvatar = true,
  showDate = true,
}: Props) => {
  const tertiaryTextColor = useColorModeValue(...themeColors.tertiaryTextColor);
  const bubbleSenderBgColor = useColorModeValue(
    ...themeColors.bubbleSenderBgColor
  );
  const bubbleReceiverBgColor = useColorModeValue(
    ...themeColors.bubbleReceiverBgColor
  );

  const alignment = isSender ? "flex-end" : "flex-start";
  const bottomRightRadius = isSender ? (showAvatar ? 0 : 32) : 32;
  const bottomLeftRadius = isSender ? 32 : showAvatar ? 0 : 32;

  return (
    <VStack
      mt={showAvatar ? 6 : 1}
      alignItems={alignment}
      alignSelf={alignment}
    >
      <HStack
        d="flex"
        flexDirection={isSender ? "row-reverse" : "row"}
        alignItems="flex-end"
      >
        <Box visibility={showAvatar ? "visible" : "hidden"}>
          <UserAvatar
            name={sender.fullName}
            avatarUrl={sender.avatarUrl}
            isOnline={sender.isOnline}
          />
        </Box>
        <Tooltip label={`${isSender ? "Sent" : "Received"} ${dateSent}`}>
          <Box
            bg={isSender ? bubbleSenderBgColor : bubbleReceiverBgColor}
            px={4}
            py={2}
            maxW={80}
            borderTopLeftRadius={32}
            borderTopRightRadius={32}
            borderBottomLeftRadius={bottomLeftRadius}
            borderBottomRightRadius={bottomRightRadius}
          >
            <Text>{message}</Text>
          </Box>
        </Tooltip>
      </HStack>
      {showDate && (
        <Text fontSize="xs" color={tertiaryTextColor} px={12}>
          {dateSent}
        </Text>
      )}
    </VStack>
  );
};

export default ChatBubble;
