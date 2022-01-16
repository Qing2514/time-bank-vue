<template>
  <div :key="id" class="p-6 md:pr-12">
    <!-- title -->
    <div class="w-full pt-2 md:pt-4">
      <h1
        class="text-gray-800 text-2xl font-bold md:text-3xl ml-2 overflow-hidden text-ellipsis whitespace-nowrap"
        >{{ title }}</h1
      >
    </div>
    <!-- info -->
    <div
      class="mt-2 md:mt-4 pb-2 px-4 md:px-6 flex flex-row flex-nowrap justify-between items-center border-b border-gray-200"
    >
      <IconAvatar :username="author" size="sm"></IconAvatar>
      <div class="text-sm text-gray-400">
        <div>
          <span class="whitespace-nowrap"
            ><IconFontAwesome
              class="inline-block align-baseline h-3 w-3 mr-1"
              icon="pen"
            />{{ dateModified }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="h-[calc(100vh-8.5rem)] md:h-[calc(100vh-9.75rem)] overflow-y-auto overflow-x-hidden"
    >
      <!-- details -->
      <div class="mt-4 md:mt-6">
        <p class="leading-relaxed indent-8 whitespace-pre-wrap">{{
          content
        }}</p>
      </div>
      <div class="text-sm text-gray-400">
        <div class="float-right">
          <br />
          <span>来源:</span>
          <span>{{ source }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { faPen } from '@fortawesome/free-solid-svg-icons'
fontawesome([faPen])
const id = ref('')
const timer = ref(Date.now())
const title = ref('')
const dateModified = ref('')
const source = ref('')
const content = ref('')
const author = ref('')

const fetchData = async () => {
  const { data: articleInfoResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/article/') +
      useRoute().params.id,
    {
      credentials: 'include',
    },
  )) as _AsyncData<InfoResponse<ArticleInfo>>

  if (articleInfoResponse.value?.status === 200) {
    const articleInfo = articleInfoResponse.value.data
    id.value = articleInfo.id
    title.value = articleInfo.title
    dateModified.value = getDateTime(articleInfo.dateModified)
    source.value = articleInfo.source
    content.value = articleInfo.content
    author.value = articleInfo.author
  }
}

watch(
  () => timer.value,
  async () => {
    await fetchData()
    timer.value = 0
  },
  {
    immediate: true,
  },
)
</script>
