import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        jsx: 'preserve',
      },
    },
  },
  build: {
    postcss: {
      postcssOptions: require('./postcss.config'),
    },
  },
  buildModules: ['@pinia/nuxt'],
  meta: {
    link: [
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
  },
  vite: {
    envPrefix: 'BAMPO_',
  },
})
