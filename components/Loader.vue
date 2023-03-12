<script setup lang="ts">
const props = defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="text-center">
    <div class="flex justify-center items-center">
      <img src="/loader.gif" alt="Loading..." class="h-20 w-20" />
    </div>
    <p class="text" v-if="props.isText">
      {{ $t("loading") }}
    </p>
  </div>
</template>
