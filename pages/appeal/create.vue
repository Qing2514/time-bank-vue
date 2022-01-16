<template>
  <div class="mx-auto max-w-4xl p-6 md:pr-12">
    <!-- title -->
    <div>
      <h1
        class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
        >新建申诉</h1
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
        <LazyAbstractActivity :aid="$route.query.activity" />
        <InputUnderLined
          v-model:value="compensation"
          label="补偿的时间币"
          pattern="^[0-9]+(\.[0-9]{0,2})?$"
          warning="不是合法的浮点数"
        />
        <h2 class="font-semibold p-2 mt-2">理由</h2>
        <div
          contenteditable="true"
          class="relative min-h-[4rem] w-full p-2 rounded outline-none bg-white text-sm whitespace-pre-wrap overflow-hidden"
          @blur="reason = ($event.currentTarget as HTMLElement)?.innerText"
          >{{ reason }}</div
        >
        <div class="absolute mt-2 right-0">
          <ButtonDefault color="orange" @click="create">新建</ButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const activity = ref('')
const compensation = ref('')
const reason = ref('')

activity.value += useRoute().query.activity

const create = async () => {
  const appealCreationRequest: CreationRequest<AppealCreation> = {
    data: {
      activityId: activity.value,
      compensation: Number.parseInt(compensation.value),
      reason: reason.value,
    },
  }

  const { data: appealCreationResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/appeal'),
    {
      method: 'POST',
      body: appealCreationRequest,
      credentials: 'include',
    },
  )) as _AsyncData<CreationResponse>

  if (
    responsePopupFilter(
      appealCreationResponse.value?.status,
      appealCreationResponse.value?.message,
    ) === 201
  ) {
    useRouter().push('/appeal')
  } else {
    return false
  }
}
</script>
