<template>
  <div
    id="landing"
    class="h-screen max-h-screen flex flex-col flex-nowrap justify-between items-center max-w-5xl mx-auto px-12 py-6"
    :class="$route.name"
  >
    <!-- header -->
    <NavLanding />
    <div
      id="landing-body"
      class="p-6 w-full h-full flex flex-col items-center"
      :class="$route.name"
    >
      <div
        id="slogan"
        class="w-auto min-h-0 justify-self-center items-end font-bold"
      >
        <span class="whitespace-nowrap leading-loose">存储<br /></span>
        <span class="whitespace-nowrap leading-loose">永远不会贬值的货币</span>
        <div id="start-button" class="justify-center items-end mt-4">
          <ButtonDefault to="/register" color="orange" size="lg"
            >开始</ButtonDefault
          >
        </div>
      </div>
      <div
        id="image"
        :style="`background-image: url(${squirrel})`"
        class="w-full h-full min-w-[128px] min-h-[128px] bg-no-repeat bg-origin-padding bg-contain pointer-events-none select-none"
      ></div>
    </div>
    <div>
      <div class="h-6">
        <span class="">©2021 Fortuna All Rights Reserved.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import squirrel from '~/assets/images/squirrel_with_pinecone.png'
</script>

<style lang="sass">
#landing
  @apply opacity-0 transition-all duration-500

  &.index
    @apply opacity-100

  &.login, &.register
    @screen md
      @apply opacity-100

#landing-body
  @apply transition-all duration-500

  &.index
    #start-button
      @apply hidden

    @screen md
      @apply p-12 grid grid-cols-2 justify-evenly

      #start-button
        @apply flex

    #slogan
      @apply justify-self-end transition-all duration-500 text-2xl

      @screen md
        @apply text-3xl

      @screen lg
        @apply text-4xl

    #image
      @apply bg-center

      @screen lg
        @apply bg-left

  &.login, &.register
    #start-button
      @apply hidden

    @screen lg
      @apply p-12 grid grid-cols-2 justify-evenly

      #start-button
        @apply flex

    #slogan
      @apply text-xl justify-self-end transition-all duration-500

      @screen lg
        @apply text-2xl

      @screen xl
        @apply text-3xl

    #image
      @apply bg-center

      @screen lg
        @apply bg-left
</style>
