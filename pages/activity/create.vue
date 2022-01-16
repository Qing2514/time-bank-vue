<template>
  <div class="p-6 md:pr-12">
    <!-- title -->
    <div>
      <h1
        class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
        >新建活动</h1
      >
      <h3 class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
        >Create Activity</h3
      >
    </div>
    <!-- info -->
    <div
      class="h-[calc(100vh-7.5rem)] md:h-[calc(100vh-8.25rem)] overflow-y-auto overflow-x-hidden"
    >
      <!-- update -->
      <div class="relative mt-4 mx-2 md:mt-6">
        <InputUnderLined
          v-model:value="title"
          label="标题"
          pattern="^.{8,32}$"
          warning="标题限制 8-32 个字符"
        />
        <InputUnderLined
          v-model:value="reward"
          class="inline-block w-1/2"
          label="总报酬"
          pattern="^[0-9]+(\.[0-9]{0,2})?$"
          warning="不是合法的浮点数"
        />
        <InputUnderLined
          v-model:value="number"
          class="inline-block w-1/2"
          label="人数"
          pattern="^[0-9]+$"
          warning="不是合法的正整数"
        />
        <InputUnderLined
          v-model:value="dateStart"
          class="inline-block w-1/2"
          type="datetime-local"
          label="开始时间"
        />
        <InputUnderLined
          v-model:value="dateEnd"
          class="inline-block w-1/2"
          type="datetime-local"
          label="结束时间"
        />
        <InputUnderLined
          v-model:value="city"
          class="inline-block w-1/2"
          label="城市"
          pattern=".+"
          warning="城市不能为空"
        />
        <InputUnderLined
          v-model:value="type"
          class="inline-block w-1/2"
          label="服务类型"
          pattern=".+"
          warning="服务类型不能为空"
        />
        <InputUnderLined
          v-model:value="address"
          label="详细地址"
          pattern=".+"
          warning="地址不能为空"
        />
        <h2 class="font-semibold p-2 mt-2">详情</h2>
        <div
          contenteditable="true"
          class="relative min-h-[4rem] w-full p-2 rounded outline-none bg-white text-sm whitespace-pre-wrap overflow-hidden"
          @blur="details = ($event.currentTarget as HTMLElement)?.innerText"
          >{{ details }}</div
        >
        <div class="absolute mt-2 right-0">
          <ButtonDefault color="orange" @click="create">新建</ButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRewardCent } from '~~/composables/RewardHandler'

const title = ref('')
const reward = ref('')
const number = ref('')
const dateStart = ref('')
const dateEnd = ref('')
const city = ref('')
const type = ref('')
const address = ref('')
const details = ref('')

const create = async () => {
  const activityCreationRequest: CreationRequest<ActivityCreation> = {
    data: {
      type: type.value,
      city: city.value,
      title: title.value,
      reward: Number.parseInt(toRewardCent(reward.value)),
      number: Number.parseInt(number.value),
      details: details.value,
      address: address.value,
      dateEnd: dateEnd.value,
      dateStart: dateStart.value,
    },
  }

  const { data: activityCreationResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/activity'),
    {
      method: 'POST',
      body: activityCreationRequest,
      credentials: 'include',
    },
  )) as _AsyncData<CreationResponse>

  if (
    responsePopupFilter(
      activityCreationResponse.value?.status,
      activityCreationResponse.value?.message,
    ) === 201
  ) {
    useRouter().push('/activity')
  } else {
    return false
  }
}
</script>
