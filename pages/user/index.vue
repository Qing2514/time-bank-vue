<template>
  <div class="flex flex-col h-screen p-6 md:pr-12">
    <div class="flex flex-row items-center">
      <!-- 左 -->
      <div class="inline-block">
        <!-- 头像 -->
        <IconAvatar :email="email" :username="username" size="xl"></IconAvatar>

        <div>
          <span>用户名：</span
          ><InputUnderLined
            class="inline-block align-middle"
            :value="username"
            label=""
          ></InputUnderLined>
        </div>
        <div>
          <span>城市：</span
          ><InputUnderLined
            class="inline-block align-middle"
            :value="city"
            label=""
          ></InputUnderLined>
        </div>
        <div class="">
          <span>邮箱：</span
          ><InputUnderLined
            class="inline-block align-middle"
            :value="email"
            label=""
          ></InputUnderLined>
        </div>

        <div class="m-2"> <ButtonDefault>更新</ButtonDefault></div>

        <ButtonDefault to="/">登出</ButtonDefault>
      </div>
      <!-- 右 -->
      <div class="inline-block ml-16 mx-auto">
        <!-- 三大块 -->
        <div class="">
          <!-- 活动 -->
          <div class="inline-block"
            ><span class="block text-center m-5 text-green-600 font-bold"
              >活动</span
            ><span class="block text-center">{{ activityNum }}</span></div
          >
          <div class="inline-block"
            ><span class="block text-center m-5 text-green-600 font-bold"
              >文章</span
            ><span class="block text-center">{{ articleNum }}</span></div
          >
          <div class="inline-block"
            ><span class="block text-center m-5 text-green-600 font-bold"
              >余额</span
            ><span class="block text-center">{{ balance }}</span></div
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const email = ref('209jkjkjk@sina.com')
const city = ref('深圳')
const username = ref('luxiaochun')
// const oldPassword = ref('')
// const newPassword = ref('')
const activityNum = ref(0)
const articleNum = ref(176)
const balance = ref(33)
// const age = ref(52)
// const accountAge = ref(22)
</script>
