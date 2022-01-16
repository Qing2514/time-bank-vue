<template>
  <div :key="id" class="p-6 md:pr-12">
    <!-- title -->
    <div class="w-full flex flex-row flex-nowrap items-center pt-2 md:pt-4">
      <BadgeDefault class="block">{{ status }}</BadgeDefault>
      <h1
        class="inline-block text-gray-800 text-2xl font-bold md:text-3xl ml-2 overflow-hidden text-ellipsis whitespace-nowrap"
        >{{ title }}</h1
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
      class="mt-2 md:mt-4 px-4 md:px-6 pb-2 flex flex-row flex-nowrap justify-between items-center border-b border-gray-200 whitespace-nowrap"
    >
      <IconAvatar :username="founder" size="sm"></IconAvatar>
      <div class="text-sm text-gray-400">
        <span class="text-2xl md:text-3xl font-semibold text-gray-600">{{
          rewardInteger
        }}</span>
        <span>.{{ rewardDecimal }} T</span>
      </div>
      <div class="text-xs text-gray-400">
        <div>
          <span>开始</span>
          <span class="md:text-lg text-gray-600"
            >&nbsp;{{ dateStartTime }}</span
          >
          <span>&nbsp;{{ dateStartDate }}</span>
        </div>
        <div>
          <span>结束</span>
          <span class="md:text-lg text-gray-600">&nbsp;{{ dateEndTime }}</span>
          <span>&nbsp;{{ dateEndDate }}</span>
        </div>
      </div>
    </div>
    <div
      class="h-[calc(100vh-8.5rem)] md:h-[calc(100vh-11.25rem)] overflow-y-auto overflow-x-hidden"
    >
      <!-- details -->
      <div class="mt-4 md:mt-6">
        <p class="leading-relaxed whitespace-pre-wrap">{{ details }}</p>
      </div>
      <!-- volunteers -->
      <div class="mx-auto mt-4 md:mt-6 px-4 md:px-6">
        <div class="mb-2">
          <span class="text-orange-600 text-2xl md:text-3xl font-semibold">{{
            volunteersCount
          }}</span>
          <span class="text-gray-400 mr-2"> / {{ number }} 志愿者<br /> </span>
        </div>
        <IconAvatar
          v-for="volunteer in volunteersAbstract"
          :key="volunteer"
          class="mx-2"
          :username="volunteer"
          size="xs"
        ></IconAvatar>
        <span
          class="uppercase text-gray-400 hover:text-orange-500 cursor-pointer"
          >more</span
        >
      </div>
      <!-- verify -->
      <div v-if="status === '审核中'" class="mt-4 md:mt-6 px-4 md:px-6">
        <div class="flex flex-row flex-nowrap justify-between">
          <span
            class="text-orange-400 hover:scale-125 font-bold mx-2 cursor-pointer transition-all"
            >同意</span
          >
          <span
            class="text-gray-400 hover:scale-125 font-bold mx-2 cursor-pointer transition-all"
            >反对</span
          >
        </div>
        <div
          class="flex flex-row flex-nowrap w-full rounded-full overflow-hidden drop-shadow"
        >
          <div class="h-2 w-2/3 bg-orange-500"></div>
          <div class="h-2 w-1/3 bg-slate-500"></div>
        </div>
        <div class="mt-2 flex flex-row flex-nowrap justify-between">
          <span class="text-sm text-gray-400 mx-2">username ...</span>
          <span class="text-sm text-gray-400 mx-2">username ...</span>
        </div>
      </div>
      <!-- update -->
      <div class="relative mt-4 mx-2 md:mt-6">
        <div
          contenteditable="true"
          class="relative min-h-[4rem] w-full p-2 rounded outline-none bg-white text-sm overflow-hidden"
          @blur="addition = ($event.currentTarget as HTMLElement)?.innerText"
          >{{ addition }}</div
        >
        <div class="absolute mt-2 right-0">
          <ButtonDefault color="orange">更新</ButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const timer = ref(Date.now())
const id = ref('')
const status = ref('')
const title = ref('')
const type = ref('')
const typeText = ref('')
const founder = ref('')
const rewardInteger = ref('')
const rewardDecimal = ref('')
const dateStartDate = ref('')
const dateStartTime = ref('')
const dateEndDate = ref('')
const dateEndTime = ref('')
const details = ref('')
const number = ref('')
const volunteersCount = ref('')
const volunteersAbstract = ref<string[]>()
const addition = ref('')

const fetchData = async () => {
  const { data: activityInfoResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/activity/').concat(
      useRoute().params.id.toString(),
    ),
    {
      credentials: 'include',
    },
  )) as _AsyncData<InfoResponse<ActivityInfo>>

  if (activityInfoResponse.value?.status === 200) {
    const activityInfo = activityInfoResponse.value.data
    id.value = activityInfo.id
    status.value = getStatusText(activityInfo.status)
    title.value = activityInfo.title
    type.value = activityInfo.type
    typeText.value = getTypeText(activityInfo.type)
    founder.value = activityInfo.founder
    rewardInteger.value = getRewardInteger(activityInfo.reward.toString())
    rewardDecimal.value = getRewardDecimal(activityInfo.reward.toString())
    dateStartDate.value = getDate(activityInfo.dateStart)
    dateStartTime.value = getTime(activityInfo.dateStart)
    dateEndDate.value = getDate(activityInfo.dateEnd)
    dateEndTime.value = getTime(activityInfo.dateEnd)
    details.value = activityInfo.details
    number.value = activityInfo.number.toString()
    volunteersCount.value = activityInfo.volunteersCount.toString()
    volunteersAbstract.value = activityInfo.volunteers
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
