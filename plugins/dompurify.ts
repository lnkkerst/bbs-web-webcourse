import createDOMPurify from "dompurify";

export default defineNuxtPlugin(async () => {
  let dompurify;
  if (process.server) {
    const { JSDOM } = await import("jsdom");
    dompurify = createDOMPurify(new JSDOM("").window);
  } else {
    dompurify = createDOMPurify();
  }
  return {
    provide: {
      dompurify,
    },
  };
});
