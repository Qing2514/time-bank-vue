<template>
  <div class="mx-auto max-w-4xl p-6 md:pr-12">
    <div class="flex flex-row flex-nowrap justify-between items-center">
      <div>
        <h1
          class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
          >团队</h1
        >
        <h3
          class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
          >Team</h3
        >
      </div>
      <ButtonRounded to="/team/create" color="orange">
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
      <LazyAbstractTeam
        v-for="team in teams"
        :key="team"
        class="mx-2"
        :tid="team"
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
const teams = ref<string[]>()

const fetchData = async () => {
  const searchRequest = ref<SearchRequest<TeamSearchFilter>>({
    query: query.value,
    page: page.value,
    pageSize: pageSize.value,
    data: {},
  })

  const { data: teamSearchResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/team/search'),
    {
      method: 'POST',
      body: searchRequest.value,
      credentials: 'include',
    },
  )) as _AsyncData<SearchResponse>

  if (
    responseFilter(
      teamSearchResponse.value?.status,
      teamSearchResponse.value?.message,
    ) === 200
  ) {
    const teamList = teamSearchResponse.value.data
    more.value = teamList.length === pageSize.value
    teams.value =
      typeof teams.value === 'undefined' || page.value === 0
        ? teamList
        : teams.value.concat(teamList)
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
    await fetchData()
    timer.value = 0
  },
  {
    immediate: true,
  },
)
</script>
