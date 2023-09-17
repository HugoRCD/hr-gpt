<script setup lang="ts">
import { ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";
import { Message } from "~/types/Chat";
import { PropType } from "vue";

defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
});

function formatDate(date: Date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("fr-FR", options);
}
</script>

<template>
  <div>
    <div
      class="p-4 rounded-xl shadow-xl text-sm max-w-xl backdrop-blur-3xl bg-primary-opacity/30 border border-white/10"
      v-if="message.role !== 'system'"
    >
      <span v-html="$mdRenderer.render(message.content)" class="prose text-primary"> </span>
    </div>
    <div class="flex items-center gap-2 mt-1" :class="[direction === 'left' ? 'justify-start' : 'justify-end']">
      <ClipboardDocumentListIcon
        class="w-6 h-6 text-white/20 cursor-pointer hover:text-white/50"
        @click="copyToClipboard(message.content)"
      />
      <span class="text-xs text-white/20" :class="`float-${direction}`">
        {{ formatDate(new Date(message.createdAt)) }}
      </span>
    </div>
  </div>
</template>
