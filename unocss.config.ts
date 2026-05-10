import presetWebFonts from "@unocss/preset-web-fonts";
import presetWind4 from "@unocss/preset-wind4";
import presetIcons from "@unocss/preset-icons";
import { defineConfig } from "unocss";

export default defineConfig({
  cli: {
    entry: {
      patterns: ["public/**/*.html"],
      outFile: "public/uno.css",
    },
  },
  presets: [
    presetWind4(),
    presetIcons(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: "Manrope",
      },
    }),
  ],
});
