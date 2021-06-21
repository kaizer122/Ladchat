import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { IoSend } from "react-icons/io5";
import { MdTagFaces } from "react-icons/md";
import { themeColors } from "../../../config/theme";
interface Props {
  message: string;
  loading: boolean;
  setMessage: (msg: string) => void;
  onSendMessage: (msg: string) => void;
}

const ChatInput = ({ onSendMessage, message, setMessage, loading }: Props) => {
  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue(...themeColors.borderColor);
  const globalBg = useColorModeValue(...themeColors.globalBg);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSendMessage(message);
    }
  };
  const onEmojiSelect = (e: any) => {
    if (e.native) setMessage(message + e.native);
  };
  return (
    <Flex pl={4} pr={2} py={2} borderTopColor={borderColor} borderTopWidth={1}>
      <InputGroup>
        <Input
          variant="outline"
          rounded="full"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement>
          <Popover
            matchWidth={true}
            lazyBehavior="keepMounted"
            isLazy={true}
            placement="top-start"
          >
            <PopoverTrigger>
              <IconButton
                mr={4}
                colorScheme="gray"
                aria-label="pick emoji"
                variant="ghost"
                isRound={true}
                icon={<MdTagFaces fontSize="1.75rem" />}
              />
            </PopoverTrigger>
            <PopoverContent w={"353px"}>
              <Picker
                set="facebook"
                onSelect={onEmojiSelect}
                showPreview={false}
                showSkinTones={false}
                title=""
                emoji=""
                theme={colorMode}
              />
            </PopoverContent>
          </Popover>
        </InputRightElement>
      </InputGroup>
      <IconButton
        colorScheme="teal"
        aria-label="Send message"
        variant="ghost"
        isRound={true}
        isLoading={loading}
        disabled={message.trim().length === 0}
        onClick={() => onSendMessage(message)}
        icon={<IoSend fontSize="1.75rem" />}
      />
    </Flex>
  );
};

export default ChatInput;
