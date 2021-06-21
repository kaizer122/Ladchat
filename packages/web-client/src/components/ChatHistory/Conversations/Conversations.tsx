import { Box, List, ListItem } from "@chakra-ui/react";
import { Conversation } from "../../../graphql";
import useBottomScrollListener from "../../../hooks/useBottomScrollListener";
import ChatSpinner from "../../Chat/ChatSpinner";
import ChatRow from "./ChatRow";
interface ConversationsProps {
  conversations: Conversation[];
  setConversation: (conversationId: string) => void;
  onFetchMore: () => void;
  fetchingMore: boolean;
}
const Conversations = ({
  conversations,
  setConversation,
  onFetchMore,
  fetchingMore,
}: ConversationsProps) => {
  const containerRef = useBottomScrollListener<HTMLDivElement>(onFetchMore, {
    inverted: false,
    triggerOnNoScroll: false,
    debounce: 500,
    debounceOptions: { trailing: true },
  });
  return (
    <Box w="full" overflowY="auto" ref={containerRef}>
      <List w="full" spacing={0}>
        {conversations.map((c) => (
          <ListItem key={c._id} onClick={() => setConversation(c._id)}>
            <ChatRow
              title={c.participants.map((p) => p.fullName).join(" ,")}
              message={c.lastMessage.message}
              seen={c.lastMessage.isSender ? true : c.lastMessage.seen}
              isOnline={c.participants[0].isOnline}
              avatarUrl={c.participants[0].avatarUrl}
              messageDate={c.lastMessage.createdAt}
            />
          </ListItem>
        ))}
      </List>
      {fetchingMore && <ChatSpinner />}
    </Box>
  );
};

export default Conversations;
