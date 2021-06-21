import { Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  useGetMessagesByConvQuery,
  useNewMessageSubscription,
} from "../../graphql";
import { removeDuplicates } from "../../helpers/removeDuplicates";
import { useLayoutStore } from "../../stores/LayoutStore";
import ContactSearch from "../ContactSearch/ContactSearch";
import GraphqlResult from "../GraphqlResult";
import { GraphqlResultProps } from "../GraphqlResult/GraphqlResult";
import Chat from "./Chat";
import ChatEmpty from "./ChatEmpty";
import ChatInputContainer from "./ChatInput/ChatInputContainer";
import ChatLoader from "./ChatLoader";
import { cacheNewMsg } from "./helperFunctions/cacheNewMsg";

const defaultLimit = 20;
const maxMessages = 500;
export const defaultPagination = { skip: 0, limit: defaultLimit };

const ChatContainer = () => {
  const selectedConversationId = useLayoutStore(
    (state) => state.selectedConversationId
  );

  const [nextSkip, setNextSkip] = useState(defaultLimit);
  const [fetchMoreState, setFetchMoreState] = useState({
    reachedEnd: false,
    loading: false,
  });

  const { previousData, data, error, loading, fetchMore } =
    useGetMessagesByConvQuery({
      variables: {
        conversationId: selectedConversationId!,
        pagination: defaultPagination,
      },
      skip: selectedConversationId ? false : true,
    });
  useNewMessageSubscription({
    variables: { conversationId: selectedConversationId },
    skip: !data || !selectedConversationId,
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!subscriptionData.data || !subscriptionData.data.newMessage) return;

      let isDup = true;
      if (!data) isDup = false;
      else {
        isDup = data.getMessagesByConv.messages.some(
          (m) => m._id === subscriptionData.data?.newMessage._id
        );
      }
      if (isDup) return;

      cacheNewMsg(subscriptionData.data.newMessage, data, client, {
        conversationId: selectedConversationId!,
        pagination: defaultPagination,
      });
    },
  });

  useEffect(() => {
    setNextSkip(defaultLimit);
    setFetchMoreState({ loading: false, reachedEnd: false });
  }, [selectedConversationId]);

  const onFetchMore = useCallback(() => {
    if (fetchMoreState.loading || fetchMoreState.reachedEnd) return;
    if (!selectedConversationId) return;
    setFetchMoreState({ loading: true, reachedEnd: false });
    fetchMore({
      variables: {
        conversationId: selectedConversationId,
        pagination: { skip: nextSkip, limit: defaultLimit },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const fetchMoreSettings = {
          loading: false,
          reachedEnd: false,
        };

        setNextSkip(nextSkip + defaultLimit);

        if (
          !fetchMoreResult?.getMessagesByConv.messages ||
          fetchMoreResult?.getMessagesByConv.messages.length === 0
        ) {
          fetchMoreSettings.reachedEnd = true;
          setFetchMoreState(fetchMoreSettings);
          return prev;
        }
        if (fetchMoreResult?.getMessagesByConv.messages.length < defaultLimit) {
          fetchMoreSettings.reachedEnd = true;
        }

        const prevMessages =
          prev.getMessagesByConv.messages.length > 0
            ? [...prev.getMessagesByConv.messages]
            : [];
        const mergedMesaages = [
          ...prevMessages,
          ...fetchMoreResult?.getMessagesByConv.messages,
        ];
        const mergedUniqueMessages = removeDuplicates(mergedMesaages);

        if (mergedUniqueMessages.length >= maxMessages)
          fetchMoreSettings.reachedEnd = true;

        setFetchMoreState(fetchMoreSettings);

        return {
          getMessagesByConv: {
            ...prev.getMessagesByConv,
            ...fetchMoreResult.getMessagesByConv,
            messages: mergedUniqueMessages,
          },
        };
      },
    });
  }, [
    fetchMoreState.loading,
    fetchMoreState.reachedEnd,
    nextSkip,
    selectedConversationId,
  ]);

  const queryProps: GraphqlResultProps = {
    data: data?.getMessagesByConv.messages,
    loading,
    error,
    LoadingCp: <ChatLoader />,
    EmptyCp: <ChatEmpty />,
  };
  return (
    <Flex
      w="full"
      flexDirection="column"
      style={{ transition: "background 300ms" }}
    >
      <ContactSearch embedded={true} />

      <GraphqlResult {...queryProps}>
        <Chat
          messages={data?.getMessagesByConv.messages || []}
          prevMessages={previousData?.getMessagesByConv.messages || []}
          onFetchMore={onFetchMore}
          loadingMore={fetchMoreState.loading}
        />
      </GraphqlResult>
      <ChatInputContainer data={data} />
    </Flex>
  );
};

export default ChatContainer;
