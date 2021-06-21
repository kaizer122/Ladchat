import { useCallback, useState } from "react";
import AudioSrc from "../../../assets/mp3/new_message.mp3";
import {
  Conversation,
  useConversationsQuery,
  useConversationUpdatedSubscription,
  useMarkConversationSeenMutation,
} from "../../../graphql";
import { removeDuplicates } from "../../../helpers/removeDuplicates";
import { useAudio } from "../../../hooks/useAudio";
import { useLayoutStore } from "../../../stores/LayoutStore";
import Empty from "../../Empty";
import GraphqlResult from "../../GraphqlResult";
import { GraphqlResultProps } from "../../GraphqlResult/GraphqlResult";
import ConverationsLoader from "./ConverationsLoader";
import Conversations from "./Conversations";
import ConversationsSearch from "./ConversationsSearch";

const defaultLimit = 10;
const maxShownConvs = 100;
const ConversationsContainer = () => {
  const {
    data,
    error,
    loading,
    updateQuery: updateConvCache = undefined,
    fetchMore,
  } = useConversationsQuery({
    variables: { pagination: { skip: 0, limit: defaultLimit } },
  });

  const [markAsSeen] = useMarkConversationSeenMutation();

  const [fetchMoreState, setFetchMoreState] = useState({
    reachedEnd: false,
    loading: false,
  });
  const [nextSkip, setNextSkip] = useState(defaultLimit);

  const setConversation = useLayoutStore((state) => state.setConversation);
  const [playing, play] = useAudio(AudioSrc);

  useConversationUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data?.conversationUpdated || !data) return;
      const incomingConv = subscriptionData.data.conversationUpdated;
      if (!incomingConv.lastMessage.isSender && !playing) play();
      // Preventing a bug where updateQuery is undefined
      if (!updateConvCache) return;
      updateConvCache((prevData) => {
        const oldDataIndex = prevData.conversations.findIndex(
          (c) => c._id === incomingConv._id
        );
        const isUpdate = oldDataIndex !== -1;
        let updatedData = [];
        if (isUpdate) {
          updatedData = [...prevData.conversations];
          updatedData.splice(oldDataIndex, 1);
          updatedData.splice(0, 0, incomingConv);
        } else {
          updatedData = [incomingConv, ...data.conversations];
        }
        return {
          conversations: updatedData,
        };
      });
    },
  });

  const onFetchMore = useCallback(() => {
    if (fetchMoreState.loading || fetchMoreState.reachedEnd) return;
    setFetchMoreState({ loading: true, reachedEnd: false });
    fetchMore({
      variables: {
        pagination: { skip: nextSkip, limit: defaultLimit },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const fetchMoreSettings = {
          loading: false,
          reachedEnd: false,
        };

        setNextSkip(nextSkip + defaultLimit);

        if (
          !fetchMoreResult?.conversations ||
          fetchMoreResult?.conversations.length === 0
        ) {
          fetchMoreSettings.reachedEnd = true;
          setFetchMoreState(fetchMoreSettings);
          return prev;
        }
        if (fetchMoreResult?.conversations.length < defaultLimit) {
          fetchMoreSettings.reachedEnd = true;
        }
        const mergedConvs = [
          ...prev.conversations,
          ...fetchMoreResult?.conversations,
        ];
        const mergedUniqueConvs = removeDuplicates(mergedConvs);

        if (mergedUniqueConvs.length >= maxShownConvs)
          fetchMoreSettings.reachedEnd = true;

        setFetchMoreState(fetchMoreSettings);

        return {
          conversations: mergedUniqueConvs,
        };
      },
    });
  }, [
    fetchMoreState.loading,
    fetchMoreState.reachedEnd,
    nextSkip,
    fetchMore,
    setFetchMoreState,
    setNextSkip,
  ]);

  const onSelectConversation = useCallback(
    (conversationId: string) => {
      setConversation(conversationId);
      markAsSeen({
        variables: { conversationId },
        update: (client, { data: mutationData, errors }) => {
          if (!mutationData || errors || !updateConvCache) return;
          updateConvCache((prev) => {
            const index = prev.conversations.findIndex(
              (c) => c._id === mutationData.markConversationSeen._id
            );
            if (index === -1) return prev;
            const updatedConvs = [...prev.conversations];
            const updatedConv = {
              ...prev.conversations[index],
              lastMessage: mutationData.markConversationSeen.lastMessage,
            };
            updatedConvs[index] = updatedConv;
            return { conversations: updatedConvs };
          });
        },
      });
    },
    [setConversation, markAsSeen, updateConvCache]
  );

  const queryProps: GraphqlResultProps = {
    data: data?.conversations,
    loading,
    error,
    LoadingCp: <ConverationsLoader />,
    EmptyCp: <Empty emptyMessage={"No conversations yet."} />,
  };
  return (
    <>
      <ConversationsSearch
        disabled={data && data.conversations.length === 0 ? true : false}
      />
      <GraphqlResult {...queryProps}>
        <Conversations
          conversations={data?.conversations as Conversation[]}
          setConversation={onSelectConversation}
          onFetchMore={onFetchMore}
          fetchingMore={fetchMoreState.loading}
        />
      </GraphqlResult>
    </>
  );
};

export default ConversationsContainer;
