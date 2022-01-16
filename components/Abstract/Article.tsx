export default defineComponent({
  props: {
    aid: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const content = ref('')
    const title = ref('')
    const author = ref('')
    const source = ref('')
    const dateModifiedYear = ref('')
    const dateModifiedMonth = ref('')
    const dateModifiedDay = ref('')

    const fetchData = async () => {
      const { data: articleAbstractResponse } = (await useFetch(
        import.meta.env.BAMPO_REST_HOST.concat('api/v1/article/')
          .concat(props.aid)
          .concat('/abstract'),
        {
          params: {
            query: props.query,
          },
          credentials: 'include',
        },
      )) as _AsyncData<AbstractResponse<ArticleAbstract>>

      if (articleAbstractResponse.value?.status === 200) {
        const articleAbstract = articleAbstractResponse.value.data
        content.value = highlightQuery(articleAbstract.content, props.query)
        title.value = highlightQuery(articleAbstract.title, props.query)
        author.value = articleAbstract.author
        source.value = articleAbstract.source
        dateModifiedYear.value = getYear(articleAbstract.dateModified)
        dateModifiedMonth.value = getMonth(articleAbstract.dateModified)
        dateModifiedDay.value = getDay(articleAbstract.dateModified)
      }
    }

    await fetchData()

    watch(
      () => props.query,
      async () => await fetchData(),
    )

    return () => (
      <div class='bg-white rounded p-4 shadow-md mb-4'>
        <div class='w-full'>
          <nuxt-link
            to={'/article/'.concat(props.aid)}
            class='inline-block text-lg md:text-xl font-semibold title-link overflow-hidden text-ellipsis whitespace-nowrap'
            v-html={title.value}
          />
        </div>
        <p class='text-sm text-gray-400 py-2' v-html={content.value} />
        <div class='flex flex-row flex-nowrap justify-between items-center'>
          <icon-avatar username={author.value} size='xs'></icon-avatar>
          <div class='text-xs text-gray-400'>
            <span class='text-base text-gray-600'>
              {dateModifiedMonth.value}-{dateModifiedDay.value}
            </span>
            <span>&nbsp;{dateModifiedYear.value}</span>
          </div>
        </div>
      </div>
    )
  },
})
