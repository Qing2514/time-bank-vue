<template>
  <div
    class="relative max-h-screen max-w-[100vw] overflow-hidden flex flex-row flex-nowrap"
  >
    <PageLeft>
      <PageLanding
        v-if="
          $route.name &&
          ['index', 'login', 'register'].includes($route.name.toString())
        "
        :class="$route.name"
      />
      <NavLeft
        v-if="
          $route.name &&
          !['index', 'login', 'register'].includes($route.name.toString())
        "
        :route="$route.name.toString()"
      />
    </PageLeft>
    <PageRight
      :class="
        $route.name &&
        !['index', 'login', 'register'].includes($route.name.toString())
          ? 'max-w-[calc(100vw-3rem)] md:max-w-[calc(100vw/3*2)]'
          : ''
      "
    >
      <slot />
    </PageRight>
    <PopupDefault />
  </div>
</template>
