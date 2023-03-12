<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import Message from "~/components/Message.vue";
import { Chat } from "~/types/Chat";
import ChatHeader from "~/components/ChatHeader.vue";
import Loader from "~/components/Loader.vue";

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
    });
    const { data } = await useFetch("/api/chat", {
      method: "POST",
      body: {
        chat: chat.value,
        message: message.value,
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
  <div class="flex flex-col container_size h-full">
    <ChatHeader :name="chat.name" :chat-id="chat.id" />
    <div class="flex-1 p-4 overflow-y-auto flex-col gap-4">
      <div v-for="msg in chat.messages" :key="msg.id" class="flex flex-col mb-4"
           :class="msg.role === 'assistant' ? 'items-start' : 'items-end'">
        <Message :message="msg" />
      </div>
      <Loader v-if="loading" />
    </div>
    <footer class="bg-secondary p-4 flex flex-col items-center gap-4">
      <div class="flex items-center flex-shrink-0 w-full">
      <textarea v-model="message"
                @keydown.enter.prevent="sendMessage"
                :disabled="loading"
                class="w-full bg-primary p-4 text-primary border-none outline-none shadow-xl border-2 border-accent rounded-xl"
                :placeholder="$t('chat.writeMessage')"
      />
        <button :disabled="loading" @click="sendMessage" class="flex items-center justify-center">
          <PaperAirplaneIcon
            class="text-accent cursor-pointer h-8 w-8 ml-4 hover:scale-125 transform transition duration-200 ease-in-out" />
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.container_size {
  position: fixed;
  width: calc(100% - 16rem);
}

@media (max-width: 768px) {
  .container_size {
    width: 100%;
  }
}
</style>