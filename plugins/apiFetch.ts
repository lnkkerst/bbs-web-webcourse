import { ofetch } from "ofetch";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiFetch: ofetch.create({
        baseURL: useRuntimeConfig().public.blogApiBase,
        onRequest,
        onResponseError,
      }),
    },
  };
});
