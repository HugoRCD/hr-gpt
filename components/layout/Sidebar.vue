<script setup lang="ts">
import { PlusCircleIcon, ChatBubbleLeftIcon } from "@heroicons/vue/24/outline";
import { useChatStore } from "~/store/ChatStore";

const chatStore = useChatStore();

const chats = computed(() => {
  return chatStore.getChats;
});

const globalStore = useGlobalStore();

const loading = computed(() => globalStore.isLoading);

async function startChat() {
  globalStore.setLoading(true);
  const { data } = await useFetch("/api/chat/startChat", {
    method: "POST",
    body: {
      userId: 1,
      name: "Test Chat",
    },
  });
  if (data.value) {
    chatStore.addChat(data.value);
    globalStore.setLoading(false);
  }
}
</script>

<template>
  <div>
    <div class="hidden fixed flex w-64 flex-col md:flex lg:flex-shrink-0 overflow-hidden h-full">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col border-r border-muted">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <Logo :isText="true" :isLogo="true" />
          </div>
          <nav class="flex flex-col h-full">
            <div class="flex-1 space-y-4 flex-start">
              <hr class="my-5 border-t border-muted" aria-hidden="true" />
              <div class="space-y-4 px-2">
                <button
                  class="w-full mb-2 flex items-center px-2 py-2 text-sm font-medium rounded-md text-white gradient"
                  @click="startChat"
                >
                  <PlusCircleIcon class="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                  {{ $t("chat.add") }}
                </button>
                <NuxtLink
                  :to="`/chat/${chat.id}`"
                  v-for="chat in chats"
                  :key="chat.id"
                  class="w-full bg-secondary flex items-center p-3 text-sm font-medium rounded-md text-white"
                >
                  <ChatBubbleLeftIcon class="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                  {{ chat.name }}
                </NuxtLink>
                <Loader v-if="loading" :size="6" />
              </div>
            </div>
            <div>
              <hr class="my-5 border-t border-muted" aria-hidden="true" />
              <LanguageSelector :is-text="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
