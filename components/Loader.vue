<script setup lang="ts">
const props = defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <div class="text-center">
    <div class="flex justify-center items-center">
      <img src="/loader.gif" alt="Loading..." :class="`h-${size} w-${size}`" />
    </div>
    <p class="text" v-if="props.isText">
      {{ $t("loading") }}
    </p>
  </div>
</template>
