<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import Message from "~/components/Message.vue";
import { Chat } from "~/types/Chat";
import ChatHeader from "~/components/ChatHeader.vue";

const chatId = useRoute().params.chatId;

const { data: chat } = await useFetch<Chat>("/api/chat/" + chatId, { method: "GET" });
if (!chat.value) throw createError({ statusCode: 404, message: "Chat not found" });

const loading = ref(false);

const message = ref("");

async function sendMessage(regenerate = false) {
  if (message.value === "" && !regenerate) return;
  loading.value = true;
  try {
    chat.value.messages.push({
      role: "user",
      content: message.value,
    })
    const { data } = await useFetch("/api/chat", {
      method: "POST",
      body: {
        chat: chat.value,
        message: message.value
      },
    });
    if (data.value) {
      chat.value = data.value.chat;
    }
    message.value = "";
    loading.value = false;
  } catch (e) {
    console.error(e);
    useErrorToast("Oups, j'ai eu un problème :(");
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col">
    <ChatHeader :name="chat.name" :chat-id="chat.id" />
     <div class="h-screen p-4 flex-grow overflow-y-auto flex flex-col gap-4">
      <div v-for="msg in chat.messages" :key="msg.id" class="flex flex-col"
           :class="msg.role === 'assistant' ? 'items-start' : 'items-end'">
        <Message :message="msg" />
      </div>
      <div class="flex justify-center items-center" v-if="loading">
        <img src="/loader.gif" alt="Loading..." class="h-24 w-24" />
      </div>
    </div>
    <form class="bg-secondary sticky bottom-0 w-full h-26 md:h-50 p-4 flex flex-col items-center flex-shrink-0 gap-4"
          @submit.prevent="sendMessage">
    <div class="flex items-center flex-shrink-0 w-full">
      <textarea v-model="message"
                @keydown.enter.prevent="sendMessage"
                :disabled="loading"
                class="w-full bg-primary p-4 text-primary border-none outline-none shadow-xl border-2 border-accent rounded-xl"
                placeholder="Ecrivez votre message ici..."></textarea>
      <button type="submit" :disabled="loading">
        <PaperAirplaneIcon
          class="text-accent cursor-pointer h-8 w-8 ml-4 hover:scale-125 transform transition duration-200 ease-in-out" />
      </button>
    </div>
    </form>
  </div>
</template>