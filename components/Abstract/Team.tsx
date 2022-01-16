export default defineComponent({
  props: {
    tid: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const city = ref('')
    const type = ref('')
    const typeText = ref('')
    const founder = ref('')
    const name = ref('')
    const description = ref('')

    const fetchData = async () => {
      const { data: teamAbstractResponse } = (await useFetch(
        import.meta.env.BAMPO_REST_HOST.concat('api/v1/team/')
          .concat(props.tid)
          .concat('/abstract'),
        {
          params: {
            query: props.query,
          },
          credentials: 'include',
        },
      )) as _AsyncData<AbstractResponse<TeamAbstract>>

      if (teamAbstractResponse.value?.status === 200) {
        const teamAbstract = teamAbstractResponse.value.data
        city.value = teamAbstract.city
        type.value = teamAbstract.type
        typeText.value = getTypeText(teamAbstract.type)
        founder.value = teamAbstract.founder
        name.value = highlightQuery(teamAbstract.name, props.query)
        description.value = highlightQuery(
          teamAbstract.description,
          props.query,
        )
      }
    }

    await fetchData()

    watch(
      () => props.query,
      async () => await fetchData(),
    )

    return () => (
      <div class='bg-white rounded p-4 shadow-md mb-4'>
        <div class='flex flex-row flex-nowrap w-full'>
          <nuxt-link
            to={'/team/'.concat(props.tid)}
            class='inline-block text-lg md:text-xl font-semibold title-link overflow-hidden text-ellipsis whitespace-nowrap'
            v-html={name.value}
          />
          <span
            onClick={() =>
              useRouter().push({
                name: 'team',
                query: { type: type.value },
              })
            }
            class='ml-auto self-start whitespace-nowrap text-xs text-gray-400 hover:text-orange-400 cursor-pointer'
          >
            {typeText.value}
          </span>
        </div>
        <p class='text-sm text-gray-400 py-2' v-html={description.value} />
        <div class='flex flex-row flex-nowrap justify-between items-center'>
          <icon-avatar username={founder.value} size='xs'></icon-avatar>
          <div class='text-xs text-gray-400'>
            <span class='text-lg md:text-sm text-gray-600 font-medium'>
              {city.value}
            </span>
          </div>
        </div>
      </div>
    )
  },
})
