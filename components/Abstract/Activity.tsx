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
    const status = ref('')
    const title = ref('')
    const type = ref('')
    const typeText = ref('')
    const details = ref('')
    const founder = ref('')
    const dateStartYear = ref('')
    const dateStartMonth = ref('')
    const dateStartDay = ref('')
    const duration = ref('')
    const number = ref(0)
    const rewardInteger = ref('')
    const rewardDecimal = ref('')
    const volunteersCount = ref(0)

    const fetchData = async () => {
      const { data: activityAbstractResponse } = (await useFetch(
        import.meta.env.BAMPO_REST_HOST.concat('api/v1/activity/')
          .concat(props.aid)
          .concat('/abstract'),
        {
          params: {
            query: props.query,
          },
          credentials: 'include',
        },
      )) as _AsyncData<AbstractResponse<ActivityAbstract>>

      if (activityAbstractResponse.value?.status === 200) {
        const activityAbstract = activityAbstractResponse.value.data
        status.value = getStatusText(activityAbstract.status)
        title.value = highlightQuery(activityAbstract.title, props.query)
        type.value = activityAbstract.type
        typeText.value = getTypeText(activityAbstract.type)
        details.value = highlightQuery(activityAbstract.details, props.query)
        founder.value = activityAbstract.founder
        dateStartYear.value = getYear(activityAbstract.dateStart)
        dateStartMonth.value = getMonth(activityAbstract.dateStart)
        dateStartDay.value = getDay(activityAbstract.dateStart)
        duration.value = getDuration(
          activityAbstract.dateStart,
          activityAbstract.dateEnd,
        )
        number.value = activityAbstract.number
        rewardInteger.value = getRewardInteger(
          activityAbstract.reward.toString(),
        )
        rewardDecimal.value = getRewardDecimal(
          activityAbstract.reward.toString(),
        )
        volunteersCount.value = activityAbstract.volunteersCount
      }
    }

    await fetchData()

    watch(
      () => props.query,
      async () => await fetchData(),
    )

    return () => (
      <>
        <div class='bg-white rounded-t p-4 shadow-md'>
          <div class='flex flex-row items-center w-full'>
            <badge-default class='block text-sm'>{status.value}</badge-default>
            <nuxt-link
              to={'/activity/'.concat(props.aid)}
              class='inline-block ml-2 text-lg md:text-xl font-semibold title-link overflow-hidden text-ellipsis whitespace-nowrap'
              v-html={title.value}
            />
            <span
              onClick={() =>
                useRouter().push({
                  name: 'activity',
                  query: { type: type.value },
                })
              }
              class='ml-auto self-start whitespace-nowrap text-xs text-gray-400 hover:text-orange-400 cursor-pointer'
            >
              {typeText.value}
            </span>
          </div>
          <p class='text-sm text-gray-400 py-2' v-html={details.value} />
          <div class='flex flex-row flex-nowrap justify-between items-center'>
            <icon-avatar username={founder.value} size='xs'></icon-avatar>
            <div class='text-xs text-gray-400'>
              <span class='text-base md:text-lg text-gray-600 font-medium'>
                {duration.value}
              </span>
              <span> h · </span>
              <span class='text-sm md:text-base text-gray-600'>
                {dateStartMonth.value}-{dateStartDay.value}
              </span>
              <span>&nbsp;{dateStartYear.value}</span>
            </div>
            <div class='text-xs text-gray-400'>
              <span class='text-gray-600 text-base md:text-lg'>
                {number.value.toString()}
                <span class='text-xs text-gray-400 mr-2'>人 </span>
              </span>
              <span class='text-xl md:text-2xl text-orange-600 font-semibold'>
                {rewardInteger.value}
              </span>
              <span>.{rewardDecimal.value} T</span>
            </div>
          </div>
        </div>
        <div class='flex flex-row flex-nowrap w-full rounded-b overflow-hidden mb-4 shadow-md'>
          <div
            class='h-2 bg-orange-400'
            style={
              'width: calc(100% / ' +
              number.value.toString() +
              ' * ' +
              volunteersCount.value.toString() +
              ')'
            }
          ></div>
          <div
            class='h-2 bg-gray-300'
            style={
              'width: calc(100% - 100% / ' +
              number.value.toString() +
              ' * ' +
              volunteersCount.value.toString() +
              ')'
            }
          ></div>
        </div>
      </>
    )
  },
})
