interface ImportMetaEnv {
  readonly VITE_OIYO_NAME: string;
  readonly VITE_OIYO_AUTHOR: string;
  readonly VITE_OIYO_WEBSITE: string;

  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
