import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@components": path.resolve(__dirname, "./src/components")
        }
    },
    plugins: [solid()]
});
