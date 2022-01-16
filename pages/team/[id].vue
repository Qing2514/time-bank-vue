<template>
  <div :key="id" class="mx-auto max-w-4xl p-6 md:pr-12">
    <!-- title -->
    <div class="w-full flex flex-row flex-nowrap items-center pt-2 md:pt-4">
      <h1
        class="inline-block text-gray-800 text-2xl font-bold md:text-3xl ml-2 overflow-hidden text-ellipsis whitespace-nowrap"
        >{{ name }}</h1
      >
      <span
        class="ml-auto self-start whitespace-nowrap text-sm text-gray-400 hover:text-orange-400 cursor-pointer"
        @click="
          () =>
            $router.push({
              name: 'activity',
              query: { type: type },
            })
        "
      >
        {{ typeText }}
      </span>
    </div>
    <!-- info -->
    <div
      class="mt-2 md:mt-4 pb-2 px-4 md:px-6 flex flex-row flex-nowrap justify-between items-center border-b border-gray-200"
    >
      <IconAvatar :username="founder" size="sm"></IconAvatar>
      <div class="text-sm font-medium">
        <div>
          <span>{{ city }}</span>
        </div>
      </div>
    </div>
    <div
      class="h-[calc(100vh-8.5rem)] md:h-[calc(100vh-9.75rem)] overflow-y-auto overflow-x-hidden"
    >
      <!-- details -->
      <div class="mt-4 md:mt-6">
        <p class="leading-relaxed indent-8">{{ description }}</p>
      </div>
      <!-- action -->
      <div class="mx-auto mt-4 md:mt-6 px-4 md:px-6">
        <ButtonDefault
          v-if="!members?.includes(user.username)"
          color="orange"
          @click="join"
          >加入</ButtonDefault
        >
        <ButtonDefault
          v-if="user.username !== founder && members?.includes(user.username)"
          @click="quit"
          >退出</ButtonDefault
        >
        <ButtonDefault v-if="user.username === founder">转让</ButtonDefault>
      </div>
      <!-- members -->
      <div class="mx-auto mt-4 md:mt-6 px-4 md:px-6">
        <div class="mb-2">
          <span class="text-orange-600 text-xl md:text-2xl font-semibold">{{
            members?.length
          }}</span>
          <span class="text-gray-400 text-sm md:text-base mr-2">
            成员<br />
          </span>
        </div>
        <IconAvatar
          v-for="member in members"
          :key="member"
          class="mx-2"
          :username="member"
          size="xs"
        ></IconAvatar>
        <span
          class="uppercase text-gray-400 hover:text-orange-500 cursor-pointer"
          >more</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~~/stores/user'

const timer = ref(Date.now())
const user = useStore()
const id = ref('')
const city = ref('')
const name = ref('')
const type = ref('')
const typeText = ref('')
const description = ref('')
const founder = ref('')
const members = ref<string[]>()

const fetchData = async () => {
  const { data: teamInfoResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/team/') +
      useRoute().params.id,
    {
      params: {
        page: '0',
        pageSize: 10,
      },
      credentials: 'include',
    },
  )) as _AsyncData<InfoResponse<TeamInfo>>

  if (teamInfoResponse.value?.status === 200) {
    const teamInfo = teamInfoResponse.value.data
    id.value = teamInfo.id
    city.value = teamInfo.city
    description.value = teamInfo.description
    name.value = teamInfo.name
    type.value = teamInfo.type
    typeText.value = getTypeText(teamInfo.type)
    founder.value = teamInfo.founder
    members.value = teamInfo.members
  }
}

const join = async () => {
  const { data: teamUpdateResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/team/') +
      useRoute().params.id.concat('/join'),
    {
      method: 'POST',
      credentials: 'include',
    },
  )) as _AsyncData<UpdateResponse>

  if (
    responsePopupFilter(
      teamUpdateResponse.value?.status,
      teamUpdateResponse.value?.message,
    ) === 200
  ) {
    useRouter().push('/team')
  }
}

const quit = async () => {
  const { data: teamUpdateResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/team/') +
      useRoute().params.id.concat('/quit'),
    {
      method: 'POST',
      credentials: 'include',
    },
  )) as _AsyncData<UpdateResponse>

  if (
    responsePopupFilter(
      teamUpdateResponse.value?.status,
      teamUpdateResponse.value?.message,
    ) === 200
  ) {
    useRouter().push('/team')
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
