<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { PlusCircleIcon, ChatBubbleLeftIcon, Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useChatStore } from "~/store/ChatStore";

const chatStore = useChatStore();

const chats = computed(() => {
  return chatStore.getChats;
});

const loading = ref(false);

async function startChat() {
  loading.value = true;
  const { data } = await useFetch("/api/chat/startChat", {
    method: "POST",
    body: {
      userId: 1,
      name: "Test Chat",
    },
  });
  if (data.value) {
    chatStore.addChat(data.value);
    loading.value = false;
  }
}

const sidebarOpen = ref(false);
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-primary focus:outline-none">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-col">
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <div class="flex min-h-0 flex-1 flex-col border-r border-muted bg-primary">
                  <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                    <div class="flex flex-shrink-0 items-center px-4">
                      <Logo :isText="true" :isLogo="true" />
                    </div>
                    <nav class="flex flex-col h-full">
                      <div class="flex-1 space-y-4 flex-start">
                        <hr class="my-5 border-t border-muted" aria-hidden="true" />
                        <div class="space-y-4 px-2">
                          <button class="w-full mb-2 flex items-center px-2 py-2 text-sm font-medium rounded-md text-white gradient" @click="startChat">
                            <PlusCircleIcon class="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                            {{ $t("chat.add") }}
                          </button>
                          <NuxtLink :to="`/chat/${chat.id}`"
                                    v-for="chat in chats" :key="chat.id" class="w-full bg-secondary flex items-center p-3 text-sm font-medium rounded-md text-white">
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
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="p-4 flex justify-between">
      <Logo :isText="true" :isLogo="true" />
      <button type="button" class="md:hidden" @click="sidebarOpen = true">
        <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
