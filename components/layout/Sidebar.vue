<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div>
    <div class="hidden fixed flex w-64 flex-col md:flex lg:flex-shrink-0 overflow-hidden h-full">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col border-r border-muted bg-primary">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <Logo :isText="true" :isLogo="true" />
          </div>
          <nav class="flex-1" aria-label="Sidebar">
            <hr class="my-5 border-t border-muted" aria-hidden="true" />
            <div class="space-y-1 px-2">
              <button class="w-full mb-2 flex items-center px-2 py-2 text-sm font-medium rounded-md text-white gradient">
                <PlusCircleIcon class="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                Ajouter un nouveau chat
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
