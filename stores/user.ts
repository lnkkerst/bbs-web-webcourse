import { type User } from "~/types/blogApi";

export const useUserStore = defineStore("user", {
  state: () =>
    ({ token: "", user: undefined }) as { token: string; user?: User },
  actions: {
    async login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) {
      const { $blogFetch } = useNuxtApp();
      const apiBase = useRuntimeConfig().public.blogApiBase;

      const res = await $fetch<{ id_token: string }>(
        `${apiBase}/api/authenticate`,
        {
          method: "POST",
          body: { username, password, rememberMe: true },
        },
      );

      this.token = res.id_token ?? "";

      const resUser = await $blogFetch("/api/account", {});
      this.user = resUser;
    },
    async logout() {
      this.token = "";
      this.user = undefined;
    },
    async refresh() {
      const { $blogFetch } = useNuxtApp();
      const resUser = await $blogFetch("/api/account", {});
      this.user = resUser;
    },
  },
  persist: true,
});
