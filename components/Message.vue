<script setup lang="ts">
import { Message } from "~/types/Chat";
import { PropType } from "@vue/runtime-core";

defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
});
</script>

<template>
  <div class="card-message p-4 bg-secondary rounded-xl shadow-xl text-sm max-w-xl"
       v-if="message.role !== 'system'">
    <span v-html="$mdRenderer.render(message.content)" class="prose text-primary">
    </span>
  </div>
</template>

