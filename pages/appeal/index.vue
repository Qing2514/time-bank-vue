<template>
  <div class="mx-auto max-w-4xl p-6 md:pr-12">
    <div class="flex flex-row flex-nowrap justify-between items-center">
      <div>
        <h1
          class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
          >申诉</h1
        >
        <h3
          class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
          >Appeal</h3
        >
      </div>
      <ButtonRounded to="/appeal/create" color="orange">
        <template #icon>
          <IconFontAwesome icon="plus" />
        </template>
        <template #text>
          <span>新建</span>
        </template>
      </ButtonRounded>
    </div>
    <!-- Abstracts -->
    <div
      class="h-[calc(100vh-8.5rem)] md:h-[calc(100vh-9.75rem)] mt-4 md:mt-6 overflow-y-auto"
      @scroll="async ($event) => await scroll($event.currentTarget as HTMLElement)"
    >
      <LazyAbstractAppeal
        v-for="appeal in appeals"
        :key="appeal"
        :aid="appeal"
      />
      <div class="w-full text-sm md:text-base text-gray-400 py-4">
        <span v-if="more" class="block max-w-fit mx-auto">加载更多</span>
        <span v-if="!more" class="block max-w-fit mx-auto">没有更多了</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
fontawesome([faPlus, faSearch])

const timer = ref(Date.now())
const page = ref(0)
const pageSize = ref(10)
const more = ref(true)
const appeals = ref<string[]>()

const fetchData = async () => {
  const { data: listResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/appeal/list'),
    {
      params: {
        page: page.value,
        pageSize: pageSize.value,
      },
      credentials: 'include',
    },
  )) as _AsyncData<ListResponse>

  if (
    responseFilter(listResponse.value?.status, listResponse.value?.message) ===
    200
  ) {
    const appealList = listResponse.value.data
    more.value = appealList.length === pageSize.value
    appeals.value =
      typeof appeals.value === 'undefined' || page.value === 0
        ? appealList
        : appeals.value?.concat(appealList)
  }
}

const scroll = async (target: HTMLElement | undefined) => {
  if (
    more.value &&
    target &&
    target.scrollTop + target.offsetHeight >= target.scrollHeight
  ) {
    page.value = page.value + 1
    await fetchData()
  }
}

watch(
  () => timer.value,
  async () => {
    if (typeof document !== 'undefined') {
      page.value = 0
      pageSize.value = Math.ceil(document.documentElement.clientHeight / 128)
      await fetchData()
      timer.value = 0
    }
  },
  {
    immediate: true,
  },
)
</script>
