<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import {Chat} from "~/types/Chat";
definePageMeta({
  name: "Chat",
  title: "Chat",
  path: "/",
});

const chat = ref<Chat[]>([]);

const loading = ref(false);

const message = ref("");

async function sendMessage() {
  if (message.value === "") return;
  loading.value = true;
  try {
    chat.value.push({
      role: "user",
      content: message.value,
    })
    const { data } = await useFetch("/api/chat", {
      method: "POST",
      body: {
        chat: chat.value,
        message: message.value,
      }
    });
    if (data.value) {
      chat.value = data.value.body.chat;
    }
    message.value = "";
    loading.value = false;
  } catch (e) {
    console.error(e);
    loading.value = false;
  }
}
</script>

<template>
  <div class="relative h-screen flex flex-col">
    <div class="p-4 flex-grow overflow-y-auto flex flex-col gap-4">
      <div v-for="msg in chat" :key="msg.id" :class="msg.role === 'assistant' ? 'text-primary text-left' : 'text-primary text-right'">
        <div class="p-4 bg-secondary rounded-xl shadow-xl inline-block">{{ msg.content }}</div>
      </div>
      <div class="flex justify-center items-center" v-if="loading">
        <img src="/loader.gif" alt="Loading..." class="h-24 w-24" />
      </div>
    </div>
    <form class="bg-secondary w-full h-40 p-4 flex items-center flex-shrink-0" @submit.prevent="sendMessage" style="position: sticky; bottom: 0;">
    <textarea v-model="message"
              @keydown.enter.prevent="sendMessage"
              :disabled="loading"
              class="w-full bg-primary p-4 text-primary border-none outline-none shadow-xl border-2 border-accent rounded-xl"
              placeholder="Type your message here..." />
      <button type="submit" :disabled="loading">
        <PaperAirplaneIcon class="text-accent cursor-pointer h-8 w-8 ml-4 hover:scale-125 transform transition duration-200 ease-in-out" />
      </button>
    </form>
  </div>

</template>

<style scoped>
</style>