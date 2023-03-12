<script setup lang="ts">
import {
  BriefcaseIcon,
  CodeBracketIcon,
  HeartIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'
import { useChatStore } from "~/store/ChatStore";
const { t } = useI18n();
const { locale } = useI18n();
definePageMeta({
  title: "Home",
  name: "Home",
  path: "/",
  description: "Home page",
  keywords: "Home",
});

const personalities = ref([
  {
    name: t("personality.developer_node.name"),
    job: t("personality.developer_node.job"),
    description: t("personality.developer_node.description"),
    pre_prompt: t("personality.developer_node.pre_prompt"),
    first_message: t("personality.developer_node.first_message"),
    icon: CodeBracketIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    name: t("personality.medic.name"),
    job: t("personality.medic.job"),
    description: t("personality.medic.description"),
    pre_prompt: t("personality.medic.pre_prompt"),
    first_message: t("personality.medic.first_message"),
    icon: HeartIcon,
    iconForeground: 'text-orange-700',
    iconBackground: 'bg-orange-50',
  }
])

watch(locale, () => {
  personalities.value = [
    {
      name: t("personality.developer_node.name"),
      job: t("personality.developer_node.job"),
      description: t("personality.developer_node.description"),
      pre_prompt: t("personality.developer_node.pre_prompt"),
      first_message: t("personality.developer_node.first_message"),
      icon: CodeBracketIcon,
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
    },
    {
      name: t("personality.medic.name"),
      job: t("personality.medic.job"),
      description: t("personality.medic.description"),
      pre_prompt: t("personality.medic.pre_prompt"),
      first_message: t("personality.medic.first_message"),
      icon: HeartIcon,
      iconForeground: 'text-orange-700',
      iconBackground: 'bg-orange-50',
    }
  ]
})

const chatStore = useChatStore();
const loading = ref(false);

async function startChat(pre_prompt: string, first_message: string, name: string) {
  loading.value = true;
  const { data } = await useFetch("/api/chat/startChat", {
    method: "POST",
    body: {
      userId: 1,
      name: "Chat " + t("with") + " " + t("personality.developer_node.name"),
      pre_prompt,
      first_message,
    },
  });
  if (data.value) {
    chatStore.addChat(data.value);
    loading.value = false;
  }
}
</script>

<template>
  <div class="md:pl-64 w-full">
    <div class="p-4 divide-y divide-primary overflow-hidden rounded-lg bg-primary shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      <div v-for="(person, personIdx) in personalities" :key="person.job" :class="[personIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '', personIdx === 1 ? 'sm:rounded-tr-lg' : '', personIdx === person.length - 2 ? 'sm:rounded-bl-lg' : '', personIdx === person.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '', 'group relative bg-secondary p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent']">
        <div>
        <span :class="[person.iconBackground, person.iconForeground, 'inline-flex rounded-lg p-3 ring-4 ring-primary']">
          <component :is="person.icon" class="h-6 w-6" aria-hidden="true" />
        </span>
        </div>
        <div class="mt-8">
          <h3 class="text-base font-semibold leading-6 text-primary">
            <button class="focus:outline-none" @click="startChat(person.pre_prompt, person.first_message, person.name)">
              <!-- Extend touch target to entire panel -->
              <span class="absolute inset-0" aria-hidden="true" />
              {{ person.job }}
            </button>
          </h3>
          <p class="mt-2 text-sm text-muted">
            {{ person.description }}
          </p>
        </div>
        <span class="pointer-events-none absolute top-6 right-6 text-muted group-hover:text-gray-400" aria-hidden="true">
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
      </div>
    </div>
  </div>
</template>

