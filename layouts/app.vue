<script setup lang="ts">
import CommandConsole from "~/components/layout/CommandConsole.vue";
import Sidebar from "~/components/layout/Sidebar.vue";
import MobileSidebar from "~/components/layout/MobileSidebar.vue";
</script>

<template>
  <div class="h-screen flex flex-col md:flex-row">
    <NuxtLoadingIndicator />
    <CommandConsole />
    <MobileSidebar class="md:hidden" />
    <Sidebar class="hidden md:flex" />
    <slot />
  </div>
</template>
