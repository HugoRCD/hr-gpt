<script setup lang="ts">
import { useChatStore } from "~/store/ChatStore";

const { locale } = useI18n();

useHead({
  title: useAppConfig().appTitle,
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: useAppConfig().appDescription },
    { name: "keywords", content: "Home" },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
  script: [
    {
      src: "https://kit.fontawesome.com/b3fb3aef7b.js",
      crossorigin: "anonymous",
    },
  ],
});

onMounted(() => {
  const userLocale = useLocalStorage("gpt_locale", "en");
  useGlobalStore().setLocale(userLocale.value);
  locale.value = userLocale.value;
});

await useChatStore().fetchChats();
</script>

<template>
  <Html data-theme="dark">
    <Body class="bg-primary m-0 p-0 text-primary overflow-x-hidden">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
