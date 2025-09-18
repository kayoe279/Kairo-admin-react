import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { format } from "date-fns";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import pkg from "./package.json";

const { dependencies, devDependencies, name, version, author } = pkg;

const appInfo = {
  pkg: { dependencies, devDependencies, name, version, author },
  lastBuildTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[name]",
      inject: "body-last",
      customDomId: "__svg__icons__dom__",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  define: {
    // 设置默认的本地图标前缀
    "import.meta.env.VITE_ICON_LOCAL_PREFIX": JSON.stringify("icon"),
    // 构建时间作为环境变量
    "import.meta.env.VITE_BUILD_TIME": JSON.stringify(format(new Date(), "yyyy-MM-dd HH:mm:ss")),
    // 应用信息
    appInfo: JSON.stringify(appInfo),
  },
});
