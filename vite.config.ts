import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import path from "path";

export default defineConfig({
	plugins: [
		vue(),
		VueSetupExtend(),
		eslintPlugin({
			include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"]
		})
	],
	css: {
		devSourcemap: true,
		preprocessorOptions: {}
	},
	resolve: {
		alias: {
			"@": path.join(__dirname, "src")
		}
	},
	server: {
		proxy: {
			"/api": {
				target: "http://47.109.54.152:8089",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "")
			}
		}
	},
	build: {
		outDir: "dist",
		// esbuild 打包更快，但是不能去除 console.log
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
});
