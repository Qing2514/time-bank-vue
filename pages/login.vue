<template>
  <div
    class="max-w-[100vw] lg:max-w-[calc(100vw/3)] flex justify-center items-center h-screen flex-col m-auto px-12 py-6"
  >
    <div class="flex flex-col">
      <InputUnderLined
        v-model:value="username"
        label="用户名"
        pattern=".+"
        color="light"
        warning="不能为空"
      />
      <InputUnderLined
        v-model:value="password"
        label="密码"
        type="password"
        pattern=".+"
        color="light"
        warning="不能为空"
      />
      <div class="flex flex-row justify-center">
        <ButtonDefault class="w-full ml-0 md:ml-0 shadow-md" @click="login"
          >登录</ButtonDefault
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CryptoJS from 'crypto-js'
import { useStore } from '~~/stores/user'

const username = ref('')
const password = ref('')

async function login() {
  const userLoginRequest: UserLoginRequest = {
    data: {
      username: username.value,
      password: CryptoJS.HmacSHA256(
        password.value,
        import.meta.env.BAMPO_SECRET,
      ).toString(),
    },
  }

  const userLoginResponse = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/user/login'),
    {
      method: 'POST',
      body: userLoginRequest,
      credentials: 'include',
    },
  )) as _AsyncData<LoginResponse>

  if (
    responsePopupFilter(
      userLoginResponse.data.value?.status,
      userLoginResponse.data.value?.message,
    ) === 200
  ) {
    useStore().$patch({
      username: username.value,
    })
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('username', useStore().$state.username)
    }
    useRouter().push('/home')
  }
}
</script>

<style scoped lang="sass">
input[type=text]
  @apply shadow-[inset_0_0_0_1000px] shadow-orange-300
input[type=password]
  @apply shadow-[inset_0_0_0_1000px] shadow-orange-300
</style>
