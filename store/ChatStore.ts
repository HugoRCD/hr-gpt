import { defineStore } from "pinia";
import { Chat } from "~/types/Chat";

type ChatState = {
  loading: boolean;
  chats: Chat[];
};

export const useChatStore = defineStore({
  id: "chat",
  state: (): ChatState => ({
    loading: false,
    chats: [],
  }),
  getters: {
    getChats: (state: ChatState) => state.chats,
  },
  actions: {
    async fetchChats() {
      this.loading = true;
      const { data: chats } = useFetch<Chat[]>("/api/chat/all");
      if (chats.value) {
        this.chats = chats.value;
      }
      this.loading = false;
    },
    addChat(chat: Chat) {
      this.chats.push(chat);
    },
    removeChat(chatId: number) {
      this.chats = this.chats.filter((chat) => chat.id !== chatId);
    },
    updateChat(chatId: number, chat: Chat) {
      const index = this.chats.findIndex((chat) => chat.id === chatId);
      this.chats[index] = chat;
    }
  }
});
