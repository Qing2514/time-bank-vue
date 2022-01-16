<template>
  <div class="p-6 md:pr-12">
    <!-- title -->
    <div>
      <h1
        class="whitespace-nowrap text-3xl md:text-4xl text-gray-700 font-medium pt-2 md:pt-4"
        >新建文章</h1
      >
      <h3 class="whitespace-nowrap text-lg md:text-xl text-gray-400 font-medium"
        >Create Article</h3
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
        <div class="relative">
          <h2 class="font-semibold p-2 mt-2">内容</h2>
          <div
            contenteditable="true"
            class="relative min-h-[4rem] w-full p-2 rounded outline-none bg-white text-sm whitespace-pre-wrap overflow-hidden"
            @blur="content = ($event.currentTarget as HTMLElement)?.innerText"
            >{{ content }}</div
          >
          <h2 class="font-semibold p-2 mt-2">来源</h2>
          <div
            contenteditable="true"
            class="relative min-h-[4rem] w-full p-2 rounded outline-none bg-white text-sm whitespace-pre-wrap overflow-hidden"
            @blur="source = ($event.currentTarget as HTMLElement)?.innerText"
            >{{ source }}</div
          >
          <div class="absolute mt-2 right-0">
            <ButtonDefault color="orange" @click="create">新建</ButtonDefault>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const title = ref('')
const content = ref('')
const source = ref('')

const create = async () => {
  const ArticleCreationRequest: CreationRequest<ArticleCreation> = {
    data: {
      title: title.value,
      content: content.value,
      source: source.value,
    },
  }

  const { data: articleCreationResponse } = (await useFetch(
    import.meta.env.BAMPO_REST_HOST.concat('api/v1/article'),
    {
      method: 'POST',
      body: ArticleCreationRequest,
      credentials: 'include',
    },
  )) as _AsyncData<CreationResponse>

  if (
    responsePopupFilter(
      articleCreationResponse.value?.status,
      articleCreationResponse.value?.message,
    ) === 201
  ) {
    useRouter().push('/article')
  } else {
    return false
  }
}
</script>
