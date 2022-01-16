interface ImportMetaEnv {
  readonly BAMPO_SECRET: string
  readonly BAMPO_REST_HOST: string
  readonly BAMPO_CLIENT_HOST: string
  readonly BAMPO_ACCESS_TOKEN: string
  readonly BAMPO_REFRESH_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
