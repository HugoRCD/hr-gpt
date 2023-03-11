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
  ],

  imports: {
    dirs: ["store"],
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
