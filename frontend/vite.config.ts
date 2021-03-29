import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";

const config: UserConfig = {
  plugins: [vue(), tsconfigPaths()],
};

export default config;
