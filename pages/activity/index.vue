<template>
  <div class="p-6 md:pr-12">
    <div class="flex flex-row flex-nowrap justify-between items-center">
      <div>
        <h1
          class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
          >活动</h1
        >
        <h3
          class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
          >Activity</h3
        >
      </div>
      <ButtonRounded to="/activity/create" color="orange">
        <template #icon>
          <IconFontAwesome icon="plus" />
        </template>
        <template #text>
          <span>新建</span>
        </template>
      </ButtonRounded>
    </div>
    <!-- search bar -->
    <div class="whitespace-nowrap">
      <IconFontAwesome class="inline-block w-4 align-middle" icon="search" />
      <InputUnderLined
        v-model:value="query"
        class="inline-block w-4/5 ml-2 align-middle"
      ></InputUnderLined>
    </div>
    <!-- Abstracts -->
    <div
      class="h-[calc(100vh-11.5rem)] md:h-[calc(100vh-12.25rem)] overflow-y-auto"
      @scroll="async ($event) => await scroll($event.currentTarget as HTMLElement)"
    >
      <LazyAbstractActivity
        v-for="activity in activities"
        :key="activity"
        :aid="activity"
        :query="query"
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
const query = ref('')
const activities = ref<string[]>()
const page = ref(0)
const pageSize = ref(10)
const more = ref(true)

const fetchData = async () => {
  const searchRequest = ref<SearchRequest<ActivitySearchFilter>>({
    query: query.value,
    page: page.value,
    pageSize: pageSize.value,
    data: {
      type: useRoute().query.type?.toString(),
    },
  })

  const { data: activitySearchResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/activity/search'),
    {
      method: 'POST',
      body: searchRequest.value,
      credentials: 'include',
    },
  )) as _AsyncData<SearchResponse>

  if (
    responseFilter(
      activitySearchResponse.value?.status,
      activitySearchResponse.value?.message,
    ) === 200
  ) {
    const activityList = activitySearchResponse.value.data
    more.value = activityList.length === pageSize.value
    activities.value =
      typeof activities.value === 'undefined' || page.value === 0
        ? activityList
        : activities.value.concat(activityList)
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
  () => query.value + useRoute().query.type?.toString(),
  async () => {
    page.value = 0
    await fetchData()
  },
)

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
