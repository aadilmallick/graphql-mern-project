import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target:
          mode === "production"
            ? "https://notes-aadil-mallick.onrender.com"
            : "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
}));
