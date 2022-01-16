<template>
  <div
    id="landing-nav"
    class="w-full h-12 flex flex-row flex-nowrap justify-between items-start"
  >
    <!-- Logo -->
    <div
      id="logo"
      class="text-2xl h-8 font-bold tracking-wide select-none pointer-events-none transition-all delay-300 duration-300"
    >
      <img class="inline-block align-bottom h-full" src="/bampo-logo.png" />
      <span class="ml-4 hidden sm:inline-block text-gray-500">BAM</span>
      <span class="hidden sm:inline-block text-orange-500">PO</span>
    </div>
    <!-- Login / Signup -->
    <div
      class="transition delay-300 duration-200"
      :class="$route.name === `index` ? `` : `opacity-0 pointer-events-none`"
    >
      <ButtonRounded to="/login" color="orange">
        <template #icon>
          <IconFontAwesome id="icon_can_hide" icon="sign-in-alt" />
        </template>
        <template #text>
          <span id="text_can_hide">登录</span>
        </template>
      </ButtonRounded>
      <ButtonRounded
        class="opacity-100 md:opacity-0 md:-mr-16 md:pointer-events-none"
        to="/register"
      >
        注册
      </ButtonRounded>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
fontawesome([faSignInAlt])
</script>

<style lang="sass">
#landing-nav
  #logo
    @apply text-3xl h-10

    @screen xl
      @apply text-4xl h-12

.index
  #landing-nav
    #logo
      @apply text-2xl h-8

    @screen xl
      @apply text-3xl h-10
</style>
