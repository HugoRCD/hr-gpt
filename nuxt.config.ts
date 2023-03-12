import en from "./locales/en.json";
import fr from "./locales/fr.json";

export default defineNuxtConfig({
  app: {
    layoutTransition: {
      name: "fade",
      mode: "out-in",
    },
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },

  css: ["~/assets/style/main.scss"],

  build: {
    transpile: ["@heroicons/vue"],
  },

  modules: [
    "nuxt-headlessui",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],

  imports: {
    dirs: ["store"],
  },

  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "fr"],
      messages: {
        en,
        fr,
      },
    },
  },

  runtimeConfig: {
    private: {
      linearApiKey: process.env.LINEAR_API_KEY,
      openAIKey: process.env.OPENAI_API_KEY,
    },
    public: {
      appDomain: process.env.FRONTEND_URL,
      appEnv: process.env.APP_ENV,
      apiUrl: process.env.API_URL,
    },
  },
});
