import { ofetch, type FetchContext } from "ofetch";

export async function onRequest(ctx: FetchContext<any>) {
  const userStore = useUserStore();

  if (userStore.token) {
    ctx.options.headers = {
      ...ctx.options.headers,
      Authorization: `Bearer ${userStore.token}`,
    };
  }
}
export async function onResponseError({ response }: FetchContext) {
  if (process.server) {
    return;
  }

  if (response?.status === 401) {
    Notify.create({
      message: "请先登录",
      type: "warning",
      position: "bottom-right",
    });
    useRouter().push({ name: "auth" });
  }

  if (response?.status?.toString()[0] === "5") {
    Notify.create({
      message: "服务器开小差了～",
      type: "warning",
      position: "bottom-right",
    });
  }
}

export const useApiFetch: typeof useFetch = (request, opts?) => {
  const { blogApiBase } = useRuntimeConfig().public;

  return useFetch(request, {
    baseURL: blogApiBase,
    onRequest,
    onResponseError,
    ...opts,
  });
};
