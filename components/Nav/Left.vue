<template>
  <div
    class="h-screen max-h-screen pl-12 py-6 flex flex-col justify-between gap-2"
  >
    <!-- items -->
    <div class="flex flex-col gap-2 items-end">
      <!-- logo -->
      <div
        id="logo"
        class="self-start items-start text-2xl h-8 font-bold tracking-wide select-none pointer-events-none transition-all delay-300 duration-300"
      >
        <img class="inline-block align-bottom h-full" src="/bampo-logo.png" />
        <span class="ml-4 hidden sm:inline-block text-gray-500">BAM</span>
        <span class="hidden sm:inline-block text-orange-500">PO</span>
      </div>
      <NuxtLink
        class="pr-4 hover:pr-6 py-2 border-r-2 border-transparent hover:border-gray-500 transition-all"
        to="/home"
      >
        <IconFontAwesome
          class="inline-block w-6 text-gray-500 mr-2 align-middle"
          icon="home"
        />
        <span class="text-lg align-middle">主页</span>
      </NuxtLink>
      <NuxtLink
        class="pr-4 hover:pr-6 py-2 border-r-2 border-transparent hover:border-gray-500 transition-all"
        to="/activity"
      >
        <IconFontAwesome
          class="inline-block w-6 text-gray-500 mr-2 align-middle"
          icon="hands-helping"
        />
        <span class="text-lg align-middle">活动</span>
      </NuxtLink>
      <NuxtLink
        class="pr-4 hover:pr-6 py-2 border-r-2 border-transparent hover:border-gray-500 transition-all"
        to="/article"
      >
        <IconFontAwesome
          class="inline-block w-6 h-6 text-gray-500 mr-2 align-middle"
          icon="newspaper"
        />
        <span class="text-lg align-middle">文章</span>
      </NuxtLink>
      <NuxtLink
        class="pr-4 hover:pr-6 py-2 border-r-2 border-transparent hover:border-gray-500 transition-all"
        to="/appeal"
      >
        <IconFontAwesome
          class="inline-block w-6 text-gray-500 mr-2 align-middle"
          icon="balance-scale-left"
        />
        <span class="text-lg align-middle">申诉</span>
      </NuxtLink>
      <NuxtLink
        class="pr-4 hover:pr-6 py-2 border-r-2 border-transparent hover:border-gray-500 transition-all"
        to="/team"
      >
        <IconFontAwesome
          class="inline-block w-6 text-gray-500 mr-2 align-middle"
          icon="users"
        />
        <span class="text-lg align-middle">团队</span>
      </NuxtLink>
    </div>
    <!-- avatar -->
    <NuxtLink
      class="self-end pr-4 hover:pr-6 py-2 border-r-2 border-transparent hover:border-gray-500 transition-all"
      to="/user"
    >
      <IconAvatar :username="username" size="md"></IconAvatar>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import {
  faHome,
  faHandsHelping,
  faNewspaper,
  faBalanceScaleLeft,
  faVoteYea,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

const username = ref('Loading...')

defineProps({
  route: {
    type: String,
    required: true,
  },
})

fontawesome([
  faHome,
  faHandsHelping,
  faNewspaper,
  faBalanceScaleLeft,
  faVoteYea,
  faUsers,
])

setTimeout(() => (username.value = ''), 0)
</script>

<style lang="sass">
.selected
  @apply border-orange-500 pr-6 pointer-events-none

  &, *
    @apply text-orange-500
</style>
