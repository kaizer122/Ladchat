import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  user?: Maybe<User>;
  token?: Maybe<Scalars["String"]>;
};

export type BaseEntity = {
  __typename?: "BaseEntity";
  _id: Scalars["ID"];
  createdAt: Scalars["Float"];
};

export type Conversation = {
  __typename?: "Conversation";
  _id: Scalars["ID"];
  createdAt: Scalars["Float"];
  participants: Array<User>;
  messages: Array<MessageResponse>;
  updatedAt: Scalars["Float"];
  lastMessage: MessageResponse;
};

export type ConversationMessagesArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Message = {
  __typename?: "Message";
  _id: Scalars["ID"];
  createdAt: Scalars["Float"];
  message: Scalars["String"];
  sender: User;
  seen: Scalars["Boolean"];
  conversationId: Scalars["ID"];
};

export type MessageResponse = {
  __typename?: "MessageResponse";
  _id: Scalars["ID"];
  createdAt: Scalars["Float"];
  message: Scalars["String"];
  sender: User;
  seen: Scalars["Boolean"];
  conversationId: Scalars["ID"];
  isSender: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: AuthResponse;
  login: AuthResponse;
  authFacebook: AuthResponse;
  testSubscriptions: Scalars["Boolean"];
  markConversationSeen: Conversation;
  sendMessage: MessageResponse;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationAuthFacebookArgs = {
  token: Scalars["String"];
};

export type MutationTestSubscriptionsArgs = {
  userId: Scalars["String"];
};

export type MutationMarkConversationSeenArgs = {
  conversationId: Scalars["String"];
};

export type MutationSendMessageArgs = {
  input: SendMessageInput;
};

export type PaginationInput = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  conversations: Array<Conversation>;
  getMessagesByConv: Conversation;
  searchContacts: Array<SearchContactsResponse>;
  user?: Maybe<User>;
  me: User;
};

export type QueryConversationsArgs = {
  pagination: PaginationInput;
};

export type QueryGetMessagesByConvArgs = {
  conversationId: Scalars["String"];
};

export type QuerySearchContactsArgs = {
  search?: Maybe<Scalars["String"]>;
};

export type QueryUserArgs = {
  userId: Scalars["ObjectId"];
};

export type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  avatarUrl: Scalars["String"];
};

export type SearchContactsResponse = {
  __typename?: "SearchContactsResponse";
  _id: Scalars["ID"];
  createdAt: Scalars["Float"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  fullName: Scalars["String"];
  email: Scalars["String"];
  avatarUrl: Scalars["String"];
  isOnline: Scalars["Boolean"];
  lastSeen: Scalars["Float"];
  conversationId?: Maybe<Scalars["String"]>;
};

export type SendMessageInput = {
  message: Scalars["String"];
  conversationId?: Maybe<Scalars["String"]>;
  receiverId?: Maybe<Scalars["String"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  notifications: Scalars["String"];
  conversationUpdated: Conversation;
  newMessage: MessageResponse;
};

export type SubscriptionNewMessageArgs = {
  conversationId?: Maybe<Scalars["ID"]>;
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  createdAt: Scalars["Float"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  fullName: Scalars["String"];
  email: Scalars["String"];
  avatarUrl: Scalars["String"];
  isOnline: Scalars["Boolean"];
  lastSeen: Scalars["Float"];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
    };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
    };
};

export type AuthFacebookMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type AuthFacebookMutation = { __typename?: "Mutation" } & {
  authFacebook: { __typename?: "AuthResponse" } & Pick<
    AuthResponse,
    "token"
  > & { user?: Maybe<{ __typename?: "User" } & UserFieldsFragment> };
};

export type MessageFieldsFragment = { __typename?: "MessageResponse" } & Pick<
  MessageResponse,
  "_id" | "message" | "isSender" | "createdAt" | "seen" | "conversationId"
> & { sender: { __typename?: "User" } & UserFieldsFragment };

export type ConversationsQueryVariables = Exact<{
  pagination: PaginationInput;
}>;

export type ConversationsQuery = { __typename?: "Query" } & {
  conversations: Array<
    { __typename?: "Conversation" } & Pick<
      Conversation,
      "_id" | "createdAt" | "updatedAt"
    > & {
        lastMessage: { __typename?: "MessageResponse" } & MessageFieldsFragment;
        participants: Array<{ __typename?: "User" } & UserFieldsFragment>;
      }
  >;
};

export type GetMessagesByConvQueryVariables = Exact<{
  pagination?: Maybe<PaginationInput>;
  conversationId: Scalars["String"];
}>;

export type GetMessagesByConvQuery = { __typename?: "Query" } & {
  getMessagesByConv: { __typename?: "Conversation" } & Pick<
    Conversation,
    "_id" | "createdAt" | "updatedAt"
  > & {
      messages: Array<
        { __typename?: "MessageResponse" } & MessageFieldsFragment
      >;
      participants: Array<{ __typename?: "User" } & UserFieldsFragment>;
    };
};

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;

export type SendMessageMutation = { __typename?: "Mutation" } & {
  sendMessage: { __typename?: "MessageResponse" } & MessageFieldsFragment;
};

export type MarkConversationSeenMutationVariables = Exact<{
  conversationId: Scalars["String"];
}>;

export type MarkConversationSeenMutation = { __typename?: "Mutation" } & {
  markConversationSeen: { __typename?: "Conversation" } & Pick<
    Conversation,
    "_id"
  > & {
      lastMessage: { __typename?: "MessageResponse" } & MessageFieldsFragment;
    };
};

export type NewMessageSubscriptionVariables = Exact<{
  conversationId?: Maybe<Scalars["ID"]>;
}>;

export type NewMessageSubscription = { __typename?: "Subscription" } & {
  newMessage: { __typename?: "MessageResponse" } & Pick<
    MessageResponse,
    "_id" | "conversationId" | "createdAt" | "isSender" | "message" | "seen"
  > & {
      sender: { __typename?: "User" } & Pick<
        User,
        | "_id"
        | "avatarUrl"
        | "createdAt"
        | "email"
        | "firstName"
        | "fullName"
        | "isOnline"
        | "lastName"
        | "lastSeen"
      >;
    };
};

export type ConversationUpdatedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type ConversationUpdatedSubscription = {
  __typename?: "Subscription";
} & {
  conversationUpdated: { __typename?: "Conversation" } & Pick<
    Conversation,
    "_id" | "createdAt" | "updatedAt"
  > & {
      lastMessage: { __typename?: "MessageResponse" } & MessageFieldsFragment;
      participants: Array<{ __typename?: "User" } & UserFieldsFragment>;
    };
};

export type NotificationsSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type NotificationsSubscription = { __typename?: "Subscription" } & Pick<
  Subscription,
  "notifications"
>;

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  | "_id"
  | "avatarUrl"
  | "createdAt"
  | "email"
  | "firstName"
  | "fullName"
  | "isOnline"
  | "lastName"
  | "lastSeen"
>;

export type SearchContactsFieldsFragment = {
  __typename?: "SearchContactsResponse";
} & Pick<
  SearchContactsResponse,
  | "_id"
  | "avatarUrl"
  | "createdAt"
  | "firstName"
  | "lastName"
  | "fullName"
  | "isOnline"
  | "conversationId"
>;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "User" } & UserFieldsFragment;
};

export type SearchContactsQueryVariables = Exact<{
  search?: Maybe<Scalars["String"]>;
}>;

export type SearchContactsQuery = { __typename?: "Query" } & {
  searchContacts: Array<
    { __typename?: "SearchContactsResponse" } & SearchContactsFieldsFragment
  >;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    _id
    avatarUrl
    createdAt
    email
    firstName
    fullName
    isOnline
    lastName
    lastSeen
  }
`;
export const MessageFieldsFragmentDoc = gql`
  fragment MessageFields on MessageResponse {
    _id
    message
    isSender
    createdAt
    seen
    conversationId
    sender {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export const SearchContactsFieldsFragmentDoc = gql`
  fragment SearchContactsFields on SearchContactsResponse {
    _id
    avatarUrl
    createdAt
    firstName
    lastName
    fullName
    isOnline
    conversationId
  }
`;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const AuthFacebookDocument = gql`
  mutation authFacebook($token: String!) {
    authFacebook(token: $token) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type AuthFacebookMutationFn = Apollo.MutationFunction<
  AuthFacebookMutation,
  AuthFacebookMutationVariables
>;

/**
 * __useAuthFacebookMutation__
 *
 * To run a mutation, you first call `useAuthFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authFacebookMutation, { data, loading, error }] = useAuthFacebookMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAuthFacebookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthFacebookMutation,
    AuthFacebookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AuthFacebookMutation,
    AuthFacebookMutationVariables
  >(AuthFacebookDocument, options);
}
export type AuthFacebookMutationHookResult = ReturnType<
  typeof useAuthFacebookMutation
>;
export type AuthFacebookMutationResult =
  Apollo.MutationResult<AuthFacebookMutation>;
export type AuthFacebookMutationOptions = Apollo.BaseMutationOptions<
  AuthFacebookMutation,
  AuthFacebookMutationVariables
>;
export const ConversationsDocument = gql`
  query Conversations($pagination: PaginationInput!) {
    conversations(pagination: $pagination) {
      _id
      createdAt
      lastMessage {
        ...MessageFields
      }
      participants {
        ...UserFields
      }
      updatedAt
    }
  }
  ${MessageFieldsFragmentDoc}
  ${UserFieldsFragmentDoc}
`;

/**
 * __useConversationsQuery__
 *
 * To run a query within a React component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useConversationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ConversationsQuery,
    ConversationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ConversationsQuery, ConversationsQueryVariables>(
    ConversationsDocument,
    options
  );
}
export function useConversationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ConversationsQuery,
    ConversationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ConversationsQuery, ConversationsQueryVariables>(
    ConversationsDocument,
    options
  );
}
export type ConversationsQueryHookResult = ReturnType<
  typeof useConversationsQuery
>;
export type ConversationsLazyQueryHookResult = ReturnType<
  typeof useConversationsLazyQuery
>;
export type ConversationsQueryResult = Apollo.QueryResult<
  ConversationsQuery,
  ConversationsQueryVariables
>;
export const GetMessagesByConvDocument = gql`
  query GetMessagesByConv(
    $pagination: PaginationInput
    $conversationId: String!
  ) {
    getMessagesByConv(conversationId: $conversationId) {
      _id
      createdAt
      messages(pagination: $pagination) {
        ...MessageFields
      }
      participants {
        ...UserFields
      }
      updatedAt
    }
  }
  ${MessageFieldsFragmentDoc}
  ${UserFieldsFragmentDoc}
`;

/**
 * __useGetMessagesByConvQuery__
 *
 * To run a query within a React component, call `useGetMessagesByConvQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByConvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByConvQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetMessagesByConvQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMessagesByConvQuery,
    GetMessagesByConvQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMessagesByConvQuery,
    GetMessagesByConvQueryVariables
  >(GetMessagesByConvDocument, options);
}
export function useGetMessagesByConvLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMessagesByConvQuery,
    GetMessagesByConvQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMessagesByConvQuery,
    GetMessagesByConvQueryVariables
  >(GetMessagesByConvDocument, options);
}
export type GetMessagesByConvQueryHookResult = ReturnType<
  typeof useGetMessagesByConvQuery
>;
export type GetMessagesByConvLazyQueryHookResult = ReturnType<
  typeof useGetMessagesByConvLazyQuery
>;
export type GetMessagesByConvQueryResult = Apollo.QueryResult<
  GetMessagesByConvQuery,
  GetMessagesByConvQueryVariables
>;
export const SendMessageDocument = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ...MessageFields
    }
  }
  ${MessageFieldsFragmentDoc}
`;
export type SendMessageMutationFn = Apollo.MutationFunction<
  SendMessageMutation,
  SendMessageMutationVariables
>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(
    SendMessageDocument,
    options
  );
}
export type SendMessageMutationHookResult = ReturnType<
  typeof useSendMessageMutation
>;
export type SendMessageMutationResult =
  Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>;
export const MarkConversationSeenDocument = gql`
  mutation MarkConversationSeen($conversationId: String!) {
    markConversationSeen(conversationId: $conversationId) {
      _id
      lastMessage {
        ...MessageFields
      }
    }
  }
  ${MessageFieldsFragmentDoc}
`;
export type MarkConversationSeenMutationFn = Apollo.MutationFunction<
  MarkConversationSeenMutation,
  MarkConversationSeenMutationVariables
>;

/**
 * __useMarkConversationSeenMutation__
 *
 * To run a mutation, you first call `useMarkConversationSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkConversationSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markConversationSeenMutation, { data, loading, error }] = useMarkConversationSeenMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMarkConversationSeenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkConversationSeenMutation,
    MarkConversationSeenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkConversationSeenMutation,
    MarkConversationSeenMutationVariables
  >(MarkConversationSeenDocument, options);
}
export type MarkConversationSeenMutationHookResult = ReturnType<
  typeof useMarkConversationSeenMutation
>;
export type MarkConversationSeenMutationResult =
  Apollo.MutationResult<MarkConversationSeenMutation>;
export type MarkConversationSeenMutationOptions = Apollo.BaseMutationOptions<
  MarkConversationSeenMutation,
  MarkConversationSeenMutationVariables
>;
export const NewMessageDocument = gql`
  subscription NewMessage($conversationId: ID) {
    newMessage(conversationId: $conversationId) {
      _id
      conversationId
      createdAt
      isSender
      message
      seen
      sender {
        _id
        avatarUrl
        createdAt
        email
        firstName
        fullName
        isOnline
        lastName
        lastSeen
      }
    }
  }
`;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useNewMessageSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >(NewMessageDocument, options);
}
export type NewMessageSubscriptionHookResult = ReturnType<
  typeof useNewMessageSubscription
>;
export type NewMessageSubscriptionResult =
  Apollo.SubscriptionResult<NewMessageSubscription>;
export const ConversationUpdatedDocument = gql`
  subscription ConversationUpdated {
    conversationUpdated {
      _id
      createdAt
      lastMessage {
        ...MessageFields
      }
      participants {
        ...UserFields
      }
      updatedAt
    }
  }
  ${MessageFieldsFragmentDoc}
  ${UserFieldsFragmentDoc}
`;

/**
 * __useConversationUpdatedSubscription__
 *
 * To run a query within a React component, call `useConversationUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useConversationUpdatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    ConversationUpdatedSubscription,
    ConversationUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    ConversationUpdatedSubscription,
    ConversationUpdatedSubscriptionVariables
  >(ConversationUpdatedDocument, options);
}
export type ConversationUpdatedSubscriptionHookResult = ReturnType<
  typeof useConversationUpdatedSubscription
>;
export type ConversationUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<ConversationUpdatedSubscription>;
export const NotificationsDocument = gql`
  subscription notifications {
    notifications
  }
`;

/**
 * __useNotificationsSubscription__
 *
 * To run a query within a React component, call `useNotificationsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    NotificationsSubscription,
    NotificationsSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NotificationsSubscription,
    NotificationsSubscriptionVariables
  >(NotificationsDocument, options);
}
export type NotificationsSubscriptionHookResult = ReturnType<
  typeof useNotificationsSubscription
>;
export type NotificationsSubscriptionResult =
  Apollo.SubscriptionResult<NotificationsSubscription>;
export const MeDocument = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchContactsDocument = gql`
  query SearchContacts($search: String) {
    searchContacts(search: $search) {
      ...SearchContactsFields
    }
  }
  ${SearchContactsFieldsFragmentDoc}
`;

/**
 * __useSearchContactsQuery__
 *
 * To run a query within a React component, call `useSearchContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchContactsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchContactsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SearchContactsQuery,
    SearchContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchContactsQuery, SearchContactsQueryVariables>(
    SearchContactsDocument,
    options
  );
}
export function useSearchContactsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchContactsQuery,
    SearchContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchContactsQuery, SearchContactsQueryVariables>(
    SearchContactsDocument,
    options
  );
}
export type SearchContactsQueryHookResult = ReturnType<
  typeof useSearchContactsQuery
>;
export type SearchContactsLazyQueryHookResult = ReturnType<
  typeof useSearchContactsLazyQuery
>;
export type SearchContactsQueryResult = Apollo.QueryResult<
  SearchContactsQuery,
  SearchContactsQueryVariables
>;
