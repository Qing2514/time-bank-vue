<template>
  <div id="page-right" :class="$route.name">
    <div class="mx-auto max-w-4xl">
      <slot />
    </div>
  </div>
</template>

<style lang="sass">
#page-right
  @apply w-full bg-gray-100 transition-all duration-700 h-screen

  &.index
    @apply min-w-0

  &.login, &.register
    @apply w-full bg-orange-300

    @screen md
      @apply w-2/5
</style>
