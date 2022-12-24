import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
	plugins: [
		vue(),
		VueSetupExtend(),
		eslintPlugin({
			include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"]
		}),
		styleImport({
			resolves: [VantResolve()],
			libs: [
				{
					libraryName: "vant",
					esModule: true,
					resolveStyle: name => `../es/${name}/style`
				}
			]
		}),
		Components({
			resolvers: [VantResolver()]
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
				target: "http://localhost:8089",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "")
			}
		}
	},
	build: {
		outDir: "dist",
		minify: "esbuild"
	}
});
