<script setup>
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/outline";
import { PlusIcon } from '@heroicons/vue/20/solid'
definePageMeta({
  name: "Chat",
  title: "Chat",
  path: "/",
});

const resetError = (error) => {
  error.value = null;
  useRouter().back();
};
</script>

<template>
  <div class="w-full">
    <NuxtErrorBoundary>
      <div class="md:pl-64 w-full">
        <NuxtPage />
        <div class="text-center flex flex-col items-center justify-center h-96">
          <ChatBubbleLeftIcon class="h-20 w-20 text-muted" aria-hidden="true" />
          <h3 class="mt-2 text-sm font-semibold text-primary">
            {{ $t("chat.empty") }}
          </h3>
          <p class="mt-1 text-sm text-muted">
            {{ $t("chat.emptyDescription") }}
          </p>
          <div class="mt-6">
            <button type="button" class="inline-flex items-center rounded-md gradient px-3 py-2 text-sm font-semibold text-white shadow-sm">
              <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              {{ $t("chat.emptyButton") }}
            </button>
          </div>
        </div>
      </div>
      <template #error="{ error }">
        <div class="p-8 bg-secondary rounded-md">
          <h2 class="text-4xl font-bold">Error</h2>
          <p>{{ error }}</p>
          <button @click="resetError(error)" class="bg-blue-500 text-white p-2 rounded-md">Retry</button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>