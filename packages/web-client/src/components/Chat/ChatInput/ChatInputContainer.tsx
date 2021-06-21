import { useState } from "react";
import {
  GetMessagesByConvQueryResult,
  useSendMessageMutation,
} from "../../../graphql";
import { useErrorHandler } from "../../../hooks";
import { useLayoutStore } from "../../../stores/LayoutStore";
import { defaultPagination } from "../ChatContainer";
import { cacheNewMsg } from "../helperFunctions/cacheNewMsg";
import ChatInput from "./ChatInput";

interface Props {
  data: GetMessagesByConvQueryResult["data"];
}

const ChatInputContainer = ({ data }: Props) => {
  const { selectedConversationId, selectedUserId, setConversation } =
    useLayoutStore(
      ({ selectedConversationId, selectedUserId, setConversation }) => ({
        selectedConversationId,
        selectedUserId,
        setConversation,
      })
    );

  const [message, setMessage] = useState("");
  const [sendMessage, { error, loading, client }] = useSendMessageMutation();
  useErrorHandler(error);

  const onSendMessage = (msg: string) => {
    if (message.trim().length === 0) return;
    setMessage("");
    sendMessage({
      variables: {
        input: {
          message: msg,
          conversationId: selectedConversationId,
          receiverId: selectedUserId,
        },
      },
      update: (_, { data: incomingData, errors }) => {
        if (errors?.length) return;
        if (!incomingData?.sendMessage) return;
        let conversationId = selectedConversationId;
        if (!selectedConversationId) {
          conversationId = incomingData.sendMessage.conversationId;
          setConversation(conversationId);
        }
        cacheNewMsg(incomingData.sendMessage, data, client, {
          conversationId: conversationId!,
          pagination: defaultPagination,
        });
      },
    });
  };
  return (
    <ChatInput
      onSendMessage={onSendMessage}
      message={message}
      setMessage={setMessage}
      loading={loading}
    />
  );
};

export default ChatInputContainer;
