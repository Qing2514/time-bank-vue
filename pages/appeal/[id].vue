<template>
  <div :key="id" class="p-6 md:pr-12">
    <!-- title -->
    <div class="w-full pt-2 md:pt-4">
      <h1
        class="text-gray-800 text-2xl font-bold md:text-3xl ml-2 overflow-hidden text-ellipsis whitespace-nowrap"
        >活动名article</h1
      >
    </div>
    <!-- info -->
    <div
      class="mt-2 md:mt-4 pb-2 px-4 md:px-6 flex flex-row flex-nowrap justify-between items-center border-b border-gray-200"
    >
      <IconAvatar :username="username" size="sm"></IconAvatar>
      <div class="text-sm text-gray-400">
        <div>
          <span>当前状态:&nbsp;</span>
          <span>当前状态status</span>
        </div>
        <br />
        <div>
          <span>补偿的时间币:&nbsp;</span>
          <span>补偿的时间币compensation</span>
        </div>
      </div>
    </div>
    <div
      class="h-[calc(100vh-8.5rem)] md:h-[calc(100vh-9.75rem)] overflow-y-auto overflow-x-hidden"
    >
      <!-- details -->
      <div class="mt-4 md:mt-6">
        <p class="leading-relaxed indent-8"
          >reason一大eason一大堆理由reason一大堆理由reason一大堆理由reason</p
        >
      </div>
      <div class="text-sm text-gray-400">
        <div class="float-right">
          <br />
          <span>申诉提交时间:&nbsp;</span>
          <span>申诉提交时间dateCreated</span>
          <br />
          <ButtonDefault color="orange">同意</ButtonDefault>
          <ButtonDefault color="orange">拒绝</ButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const timer = ref(Date.now())
const id = ref('')
const username = ref('')
const activity = ref('')
const status = ref('')
const compensation = ref('')
const reason = ref('')

const fetchData = async () => {
  const { data: appealInfoResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/appeal/') +
      useRoute().params.id,
    {
      params: {
        page: '0',
        pageSize: 10,
      },
      credentials: 'include',
    },
  )) as _AsyncData<InfoResponse<AppealInfo>>

  if (appealInfoResponse.value?.status === 200) {
    const appealInfo = appealInfoResponse.value.data
    id.value = appealInfo.id
    username.value = appealInfo.username
    activity.value = appealInfo.activityId
    status.value = appealInfo.status
    compensation.value = appealInfo.compensation.toString()
    reason.value = appealInfo.reason
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
