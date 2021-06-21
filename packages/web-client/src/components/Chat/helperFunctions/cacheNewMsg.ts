import { ApolloClient } from "@apollo/client";
import {
  GetMessagesByConvDocument,
  GetMessagesByConvQueryHookResult,
  GetMessagesByConvQueryVariables,
  MessageResponse,
} from "../../../graphql";

export function cacheNewMsg(
  newMessage: MessageResponse,
  data: GetMessagesByConvQueryHookResult["data"],
  client: ApolloClient<any>,
  variables: GetMessagesByConvQueryVariables
) {
  if (data)
    client.writeQuery({
      query: GetMessagesByConvDocument,
      variables,
      data: {
        getMessagesByConv: {
          ...data.getMessagesByConv,
          messages: [newMessage, ...data.getMessagesByConv.messages],
        },
      },
    });
}
