export default defineNuxtPlugin(() => {
  const {
    public: { openFetch: clients },
  } = useRuntimeConfig();

  return {
    provide: Object.fromEntries(
      Object.entries(clients).map(([name, options]) => [
        `${name}Fetch`,
        createOpenFetch(_options => ({
          ...options,
          ..._options,
          async onRequest(ctx) {
            const userStore = useUserStore();

            if (userStore.token) {
              ctx.options.headers = {
                ...ctx.options.headers,
                Authorization: `Bearer ${userStore.token}`,
              };
            }
          },
          async onResponseError({ response }) {
            if (process.server) {
              return;
            }

            if (response.status === 401) {
              Notify.create({
                message: "请先登录",
                type: "warning",
                position: "bottom-right",
              });
              useRouter().push({ name: "auth" });
            }

            if (response.status.toString()[0] === "5") {
              Notify.create({
                message: "服务器开小差了～",
                type: "warning",
                position: "bottom-right",
              });
            }
          },
        })),
      ]),
    ),
  };
});
