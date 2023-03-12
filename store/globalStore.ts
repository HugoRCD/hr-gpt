import { defineStore } from "pinia";

type GlobalState = {
  locale: string;
};

export const useGlobalStore = defineStore({
  id: "global",
  state: (): GlobalState => ({
    locale: "en",
  }),
  getters: {
    getLocale(): string {
      return this.locale;
    },
  },
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
});
