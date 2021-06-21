import { Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import { MessageResponse } from "../../graphql";
import useBottomScrollListener from "../../hooks/useBottomScrollListener";
import ChatBubble from "./ChatBubble";
import ChatSpinner from "./ChatSpinner";
import ScrollToBottom from "./ScrollToBottom";
type Props = {
  messages: MessageResponse[];
  prevMessages: MessageResponse[];
  onFetchMore: () => void;
  loadingMore: boolean;
};

const Chat = ({ onFetchMore, messages, prevMessages, loadingMore }: Props) => {
  const containerRef = useBottomScrollListener<HTMLDivElement>(onFetchMore, {
    inverted: true,
    triggerOnNoScroll: false,
    debounce: 500,
    debounceOptions: { trailing: true },
  });
  return (
    <Flex
      ref={containerRef}
      px={6}
      overflowY="auto"
      flexDirection="column-reverse"
      flex={1}
      pb={2}
    >
      <ScrollToBottom messages={messages} prevMessages={prevMessages} />
      {messages.map(({ message, isSender, createdAt, sender }, index) => (
        <ChatBubble
          key={index}
          message={message}
          isSender={isSender}
          sender={sender}
          showAvatar={
            index + 1 > messages.length - 1
              ? true
              : messages[index + 1].isSender !== isSender
          }
          showDate={
            index === 0
              ? true
              : messages[index - 1].isSender !== isSender &&
                dayjs.tz(messages[index - 1].createdAt).fromNow() !==
                  dayjs.tz(createdAt).fromNow()
          }
          dateSent={dayjs.tz(createdAt).fromNow()}
        />
      ))}
      {loadingMore && <ChatSpinner />}
    </Flex>
  );
};

export default Chat;
