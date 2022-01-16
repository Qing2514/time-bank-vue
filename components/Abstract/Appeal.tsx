export default defineComponent({
  props: {
    aid: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const status = ref('')
    const username = ref('')
    const reason = ref('')

    const fetchData = async () => {
      const { data: appealAbstractResponse } = (await useFetch(
        import.meta.env.BAMPO_REST_HOST.concat('api/v1/appeal/')
          .concat(props.aid)
          .concat('/abstract'),
        {
          credentials: 'include',
        },
      )) as _AsyncData<AbstractResponse<AppealAbstract>>

      if (appealAbstractResponse.value?.status === 200) {
        const teamAbstract = appealAbstractResponse.value.data
        status.value = getStatusText(teamAbstract.status)
        username.value = teamAbstract.username
        reason.value = teamAbstract.reason
      }
    }

    await fetchData()

    return () => (
      <div class='bg-white rounded p-4 shadow-md mb-4'>
        <div class='flex flex-row flex-nowrap items-center w-full mb-2'>
          <badge-default class='block text-sm'>{status.value}</badge-default>
          <nuxt-link
            to={'/appeal/'.concat(props.aid)}
            class='inline-block ml-2 text-lg md:text-xl font-semibold title-link overflow-hidden text-ellipsis whitespace-nowrap'
            v-html={reason.value}
          />
        </div>
        {/* <p class='text-sm text-gray-400 py-2' v-html={reason.value} /> */}
        <icon-avatar username={username.value} size='xs'></icon-avatar>
      </div>
    )
  },
})
