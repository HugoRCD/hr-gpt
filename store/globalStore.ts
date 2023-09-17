import { defineStore } from "pinia";

type GlobalState = {
  locale: string;
  loading: boolean;
};

export const useGlobalStore = defineStore({
  id: "global",
  state: (): GlobalState => ({
    locale: "en",
    loading: false,
  }),
  getters: {
    getLocale(): string {
      return this.locale;
    },
    isLoading(): boolean {
      return this.loading;
    },
  },
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
