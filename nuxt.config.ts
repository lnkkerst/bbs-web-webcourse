// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  devtools: { enabled: true },
  css: ["./assets/styles/global.scss"],
  modules: [
    "@vueuse/nuxt",
    "nuxt-open-fetch",
    "nuxt-lodash",
    "@unocss/nuxt",
    "nuxt-icon",
    "nuxt-quasar-ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@formkit/auto-animate",
    "@hypernym/nuxt-anime",
  ],
  runtimeConfig: {
    public: {
      blogApiBase: process.env["NUXT_BLOGAPI_BASE"],
    },
  },
  openFetch: {
    disablePlugin: true,
    clients: {
      blog: {
        baseURL: process.env["NUXT_BLOGAPI_BASE"],
      },
    },
  },
  quasar: {
    iconSet: "mdi-v7",
    plugins: ["Notify", "Loading", "Dialog"],
    lang: "zh-CN",
    sassVariables: "./assets/styles/quasar.variables.scss",
  },
  anime: {
    provide: false,
    composables: true,
  },
});
