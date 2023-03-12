<script setup>
definePageMeta({
  name: "Chat",
  title: "Chat",
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