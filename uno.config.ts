import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerAttributifyJsx,
  transformerDirectives,
} from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetTagify(),
    presetWebFonts(),
    presetTypography(),
    presetAttributify(),
    presetScrollbar(),
  ],
  transformers: [transformerDirectives(), transformerAttributifyJsx()],
});
