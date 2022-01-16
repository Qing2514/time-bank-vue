<template>
  <div class="mx-auto max-w-4xl p-6 md:pr-12">
    <!-- title -->
    <div>
      <h1
        class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
        >新建团队</h1
      >
      <h3 class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
        >Create Team</h3
      >
    </div>
    <!-- info -->
    <div
      class="h-[calc(100vh-7.5rem)] md:h-[calc(100vh-8.25rem)] overflow-y-auto overflow-x-hidden"
    >
      <!-- update -->
      <div class="relative mt-4 mx-2 md:mt-6">
        <InputUnderLined
          v-model:value="name"
          label="团队名"
          pattern="^.{4,16}$"
          warning="团队名限制 4-16 个字符"
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
          label="团队类型"
          pattern=".+"
          warning="团队类型不能为空"
        />
        <h2 class="font-semibold p-2 mt-2">简介</h2>
        <div
          contenteditable="true"
          class="relative min-h-[4rem] w-full p-2 rounded outline-none bg-white text-sm whitespace-pre-wrap overflow-hidden"
          @blur="description = ($event.currentTarget as HTMLElement)?.innerText"
          >{{ description }}</div
        >
        <div class="absolute mt-2 right-0">
          <ButtonDefault color="orange" @click="create">新建</ButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const name = ref('')
const city = ref('')
const type = ref('')
const description = ref('')

const create = async () => {
  const teamCreationRequest: RegistrationRequest<TeamRegistration> = {
    data: {
      name: name.value,
      city: city.value,
      type: type.value,
      description: description.value,
    },
  }

  const { data: teamCreationResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/team/registration'),
    {
      method: 'POST',
      body: teamCreationRequest,
      credentials: 'include',
    },
  )) as _AsyncData<RegistrationResponse>

  if (
    responsePopupFilter(
      teamCreationResponse.value?.status,
      teamCreationResponse.value?.message,
    ) === 201
  ) {
    useRouter().push('/team')
  } else {
    return false
  }
}
</script>
