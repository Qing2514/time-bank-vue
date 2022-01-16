<template>
  <div class="mx-auto max-w-4xl p-6 pr-12">
    <h1
      class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
      >验证</h1
    >
    <h3 class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
      >Verification</h3
    >
    <div class="mx-auto mt-4">
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const emailVerificationResponse = useFetch(
  import.meta.env.BAMPO_REST_HOST.concat('api/v1/user/')
    .concat(useRoute().params.username.toString())
    .concat('/verfication'),
  {
    params: {
      token: useRoute().query.token,
    },
  },
) as _AsyncData<VerificationResponse>

const result = computed(() => {
  if (emailVerificationResponse.data.value?.status === 200) {
    return '验证成功'
  } else {
    return '验证失败'
  }
})
</script>
