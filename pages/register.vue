<template>
  <div
    class="max-w-[100vw] lg:max-w-[calc(100vw/3)] flex justify-center items-center h-screen flex-col px-12 py-6"
  >
    <div class="flex flex-col">
      <InputUnderLined
        v-model:value="username"
        color="light"
        label="用户名*"
        pattern="\w{4,16}"
        warning="需要 4-16 位英文字母、数字或下划线的组合"
      />
      <InputUnderLined
        v-model:value="email"
        color="light"
        type="email"
        label="邮箱*"
        pattern="^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$"
        warning="不合法的邮箱"
      />
      <InputUnderLined
        v-model:value="phoneNumber"
        color="light"
        label="手机号"
        pattern="^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$"
        warning="不合法的手机号码"
      />
      <InputUnderLined
        v-model:value="city"
        color="light"
        label="城市*"
        pattern=".+"
        warning="不能为空"
      />
      <InputUnderLined
        v-model:value="fullName"
        color="light"
        label="姓名*"
        pattern="^([\u4e00-\u9fa5]·?){2,}$"
        warning="不合法的姓名"
      />
      <InputUnderLined
        v-model:value="IDnum"
        color="light"
        label="身份证*"
        pattern="^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$"
        warning="不合法的身份证号"
      />
      <InputUnderLined
        v-model:value="password"
        color="light"
        type="password"
        label="密码*"
        pattern="^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}"
        warning="8-16 位包含大、小写字母、数字和符号至少 3 种"
      />
      <div class="flex flex-row justify-center">
        <ButtonDefault class="ml-0 md:ml-0 w-full shadow-md" @click="register"
          >注册</ButtonDefault
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CryptoJS from 'crypto-js'

const username = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const city = ref('')
const fullName = ref('')
const IDnum = ref('')
async function register() {
  const userRegistrationRequest: RegistrationRequest<UserRegistration> = {
    data: {
      identity: CryptoJS.HmacSHA256(
        fullName.value,
        IDnum.value.concat(import.meta.env.BAMPO_SECRET),
      ).toString(),
      username: username.value,
      password: CryptoJS.HmacSHA256(
        password.value,
        import.meta.env.BAMPO_SECRET,
      ).toString(),
      fullName: fullName.value,
      city: city.value,
      email: email.value,
      phoneNumber: Number.parseInt(phoneNumber.value),
    },
  }

  const { data: userRegistrationResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/user/registration'),
    {
      method: 'POST',
      body: userRegistrationRequest,
    },
  )) as _AsyncData<RegistrationResponse>

  if (
    responsePopupFilter(
      userRegistrationResponse.value?.status,
      userRegistrationResponse.value?.message,
    ) === 201
  ) {
    useRouter().push('/login')
  } else {
    return false
  }
}
</script>

<style scoped lang="sass">
input[type=text]
  @apply shadow-[inset_0_0_0_1000px] shadow-orange-300
input[type=password]
  @apply shadow-[inset_0_0_0_1000px] shadow-orange-300
</style>
