<script setup lang="ts">
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/outline";
import { PlusIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  title: "Home",
  name: "Home",
  path: "/",
  description: "Home page",
  keywords: "Home",
});
</script>

<template>
  <div class="md:pl-64 w-full">
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
</template>

