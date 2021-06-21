import { mountStoreDevtool } from "simple-zustand-devtools";
import create, { SetState } from "zustand";
type OptionalNullableString = string | null | undefined;
export type IConversation = {
  selectedConversationId: OptionalNullableString;
  selectedUserId: OptionalNullableString;
  showChat: boolean;
  showFiles: boolean;
  hasConversations: boolean;
  toggleShowFiles: () => void;
  setConversation: (
    conversationId?: OptionalNullableString,
    userId?: OptionalNullableString
  ) => void;
  setHasConversations: (value: boolean) => void;
  onLogout: () => void;
};

export const CONVERSATION_KEY = "conversationId";

const conversationStore = (set: SetState<IConversation>) => ({
  selectedConversationId: localStorage.getItem(
    CONVERSATION_KEY
  ) as OptionalNullableString,
  selectedUserId: null as OptionalNullableString,
  showChat: localStorage.getItem(CONVERSATION_KEY) ? true : false,
  showFiles: false,
  hasConversations: false,
  toggleShowFiles: () => {
    set((state) => {
      state.showFiles = !state.showFiles;
    });
  },
  setConversation: (
    conversationId?: OptionalNullableString,
    userId?: OptionalNullableString
  ) => {
    set((state) => {
      state.selectedConversationId = conversationId;
      state.selectedUserId = userId;
      state.showChat = conversationId || userId ? true : false;
    });
    if (conversationId) {
      localStorage.setItem("conversation", conversationId);
    }
  },
  setHasConversations: (value: boolean) => {
    set((state) => {
      state.hasConversations = value;
    });
  },
  onLogout: () => {
    localStorage.removeItem(CONVERSATION_KEY);
    set((state) => {
      state.selectedConversationId = null;
      state.selectedUserId = null;
      state.showChat = false;
      state.showFiles = false;
    });
  },
});

export const useLayoutStore = create(conversationStore);

//@ts-ignore
mountStoreDevtool("LayoutStore", useLayoutStore);
