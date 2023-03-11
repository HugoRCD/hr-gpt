<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import {Chat} from "~/types/Chat";
definePageMeta({
  name: "Chat",
  title: "Chat",
  path: "/",
});

const chats = ref<Chat[]>([]);

const loading = ref(false);

const message = ref("");

async function sendMessage() {
  if (message.value === "") return;
  chats.value.push({
    sender: "user",
    message: message.value,
  });
  message.value = "";
  await new Promise((resolve) => setTimeout(resolve, 1000));
  chats.value.push({
    sender: "ia",
    message: "Hello, I'm a chatbot!",
  });
}
</script>

<template>
  <div class="relative h-screen">
    <div class="p-4 h-full overflow-y-auto">
      <div v-for="chat in chats" :key="chat.id" :class="chat.sender === 'ia' ? 'text-primary text-left' : 'text-primary text-right'">
        <div class="p-4 bg-secondary rounded-xl shadow-xl inline-block">
          {{ chat.message }}
        </div>
      </div>
      <div class="flex justify-center items-center" v-if="loading">
        <img src="/loader.gif" alt="Loading..." class="h-24 w-24" />
      </div>
    </div>
    <form class="absolute bg-secondary bottom-0 left-0 w-full p-4 flex items-center" @submit.prevent="sendMessage">
        <textarea v-model="message"
                  class="w-full bg-primary p-4 text-primary border-none outline-none shadow-xl border-2 border-accent rounded-xl"
                  placeholder="Type your message here..." />
      <button type="submit">
        <PaperAirplaneIcon class="text-accent cursor-pointer h-8 w-8 ml-4 hover:scale-125 transform transition duration-200 ease-in-out" />
      </button>
    </form>
  </div>
</template>

<style scoped>
</style>