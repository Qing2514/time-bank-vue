<template>
  <div class="p-6 md:pr-12">
    <div class="flex flex-row flex-nowrap justify-between items-center">
      <div>
        <h1
          class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
          >文章</h1
        >
        <h3
          class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
          >Article</h3
        >
      </div>
      <ButtonRounded to="/article/create" color="orange">
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
      <LazyAbstractArticle
        v-for="article in articles"
        :key="article"
        :aid="article"
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
const page = ref(0)
const pageSize = ref(10)
const more = ref(true)
const articles = ref<string[]>()

const fetchData = async () => {
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
  () => query.value,
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
