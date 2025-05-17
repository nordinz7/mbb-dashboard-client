/// <reference types="@rsbuild/core/types" />

// Add Vite-style env typing for Rsbuild
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
