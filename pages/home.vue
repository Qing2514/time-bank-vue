<template>
  <div class="p-6 md:pr-12">
    <div class="flex flex-row flex-nowrap justify-between items-end">
      <div>
        <h1
          class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
          >主页</h1
        >
        <h3
          class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
          >Home</h3
        >
      </div>
      <div
        ><span
          class="text-lg md:text-xl mr-2 md:mr-4 cursor-pointer hover:text-orange-400"
          @click="() => (show = false)"
          >文章</span
        >
        <span
          class="text-lg md:text-xl cursor-pointer hover:text-orange-400"
          @click="() => (show = true)"
          >活动</span
        >
      </div>
    </div>
    <div
      class="h-[calc(100vh-8.5rem)] md:h-[calc(100vh-9.75rem)] mt-4 md:mt-6 overflow-y-auto"
      @scroll="async ($event) => await scroll($event.currentTarget as HTMLElement)"
    >
      <div v-if="show === false">
        <LazyAbstractArticle
          v-for="article in articles"
          :key="article"
          :aid="article"
          :query="query"
        />
      </div>
      <div v-if="show === true">
        <LazyAbstractActivity
          v-for="activity in activities"
          :key="activity"
          :aid="activity"
          :query="query"
        />
      </div>
      <div class="w-full text-sm md:text-base text-gray-400 py-4">
        <span v-if="more" class="block max-w-fit mx-auto">加载更多</span>
        <span v-if="!more" class="block max-w-fit mx-auto">没有更多了</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const timer = ref(Date.now())
const show = ref(false)
const query = ref('')
const activities = ref<string[]>()
const articles = ref<string[]>()
const page = ref(0)
const pageSize = ref(5)
const more = ref(true)

const fetchData = async () => {
  if (show.value) {
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
  } else {
    const searchRequest = ref<SearchRequest<ArticleSearchFilter>>({
      query: query.value,
      page: page.value,
      pageSize: pageSize.value,
      data: {},
    })

    const { data: articleSearchResponse } = (await useFetch(
      import.meta.env.BAMPO_REST_HOST.concat('api/v1/article/search'),
      {
        method: 'POST',
        body: searchRequest.value,
        credentials: 'include',
      },
    )) as _AsyncData<SearchResponse>

    if (
      responseFilter(
        articleSearchResponse.value?.status,
        articleSearchResponse.value?.message,
      ) === 200
    ) {
      const articleList = articleSearchResponse.value.data
      more.value = articleList.length === pageSize.value
      articles.value =
        typeof articles.value === 'undefined' || page.value === 0
          ? articleList
          : articles.value.concat(articleList)
    }
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
  () => show.value,
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
