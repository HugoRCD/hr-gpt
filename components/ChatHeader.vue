<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { ExclamationTriangleIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  chatId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const edit_mode = ref(false);
const nameRef = ref(props.name);
const open = ref(false);

async function updateName() {
  try {
    const { data } = await useFetch(`/api/chat/${props.chatId}`, {
      method: "POST",
      body: {
        name: nameRef.value,
      },
    });
    if (data.value) {
      nameRef.value = data.value.name;
    }
  } catch (e) {
    console.error(e);
    useErrorToast("Oups, j'ai eu un problème :(");
  }
}

async function deleteChat() {
  try {
    const { data } = await useFetch(`/api/chat/${props.chatId}`, {
      method: "DELETE",
    });
    if (data.value) {
      useSuccessToast("Chat supprimé avec succès !");
      useRouter().push("/app/chat");
    }
  } catch (e) {
    console.error(e);
    useErrorToast("Oups, j'ai eu un problème :(");
  }
}
</script>

<template>
  <div class="flex md:flex items-center md:justify-between p-6 bg-secondary">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-primary sm:truncate sm:text-3xl sm:tracking-tight" v-if="!edit_mode">
        {{ nameRef }}
      </h2>
      <input type="text" v-model="nameRef"
             class="bg-transparent text-2xl font-bold leading-7 text-primary sm:truncate sm:text-3xl sm:tracking-tight focus:outline-none"
             @blur="updateName" v-else />
    </div>
    <div class="flex md:mt-0 md:ml-4">
      <button type="button" @click="edit_mode = !edit_mode" v-if="!edit_mode"
              class="flex gap-2 inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
        <PencilIcon class="h-4 w-4" />
        <span class="hidden sm:block">
          Modifier le nom
        </span>
      </button>
      <button type="button" @click="edit_mode = !edit_mode" v-else
              class="flex gap-2 inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
        <XMarkIcon class="h-4 w-4" />
        <span class="hidden sm:block">
          Annuler
        </span>
      </button>
      <button type="button" @click="open = true"
              class="flex gap-2 ml-3 inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600">
        <TrashIcon class="h-4 w-4" />
        <span class="hidden sm:block">
          Supprimer le chat
        </span>
      </button>
    </div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
                             enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                             enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                             leave-from="opacity-100 translate-y-0 sm:scale-100"
                             leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                      Supprimer le chat
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer ce chat ? Cette action est irréversible.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:ml-10 sm:flex sm:pl-4">
                  <button type="button"
                          class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                          @click="deleteChat">
                    Supprimer
                  </button>
                  <button type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                          @click="open = false" ref="cancelButtonRef">
                    Annuler
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

