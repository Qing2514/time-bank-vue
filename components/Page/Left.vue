<template>
  <div id="page-left" :class="$route.name">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="sass">
=prepend($prefix)
  @at-root .#{$prefix}#{&}
    @content

#page-left
  @apply transition-all duration-700 h-screen
  @apply w-12 min-w-[3rem]    overflow-hidden

  @screen md
    @apply w-1/3 min-w-[calc(100%/3)]

  .content
    @apply transition-all ease-in delay-500

  &.index
    @apply w-full min-w-full

  &.login, &.register
    @apply w-0 min-w-0 delay-200

    @screen md
      @apply w-3/5 min-w-[calc(100%/5*3)] delay-[0ms]

  &.close
    @apply w-0 min-w-0 delay-200

    @screen md
      @apply w-0 min-w-0 delay-100

    .content
      @apply delay-[0ms] opacity-0
</style>
