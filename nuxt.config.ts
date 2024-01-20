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
  vite: {
    optimizeDeps: {
      include: ["marked", "md-editor-v3", "zod", "overlayscrollbars-vue"],
    },
  },
  modules: [
    "@vueuse/nuxt",
    "nuxt-open-fetch",
    "nuxt-lodash",
    "@unocss/nuxt",
    "nuxt-icon",
    "nuxt-quasar-ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@hypernym/nuxt-anime",
  ],
  runtimeConfig: {
    public: {
      blogApiBase: process.env["NUXT_PUBLIC_BLOG_API_BASE"],
    },
    openFetch: {
      blog: {
        baseURL: process.env["NUXT_OPEN_FETCH_BLOG_BASE_URL"],
      },
    },
  },
  openFetch: {
    disablePlugin: true,
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
