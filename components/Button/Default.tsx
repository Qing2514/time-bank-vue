import { RouterLink } from 'vue-router'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: 'gray',
    },
  },
  setup(props, { slots }) {
    const tailwindClasses = ref(
      'inline-block rounded-md align-baseline text-center shadow whitespace-nowrap font-bold tracking-wide hover:shadow-md transition-all duration-300 cursor-pointer ripple',
    )

    switch (props.color) {
      case 'orange':
        tailwindClasses.value +=
          ' bg-orange-400 text-white active:bg-orange-300'
        break
      default:
        tailwindClasses.value += ' bg-gray-300 text-gray-700 active:bg-gray-400'
        break
    }

    switch (props.size) {
      case 'sm':
        tailwindClasses.value += ' px-4 py-1 ml-2 text-xs xl:px-6 xl:text-sm'
        break
      case 'lg':
        tailwindClasses.value +=
          ' px-6 py-2 ml-2 text-sm md:px-8 md:ml-4 md:text-base xl:px-10 xl:text-lg'
        break
      default:
        tailwindClasses.value +=
          ' px-4 py-2 ml-2 text-xs md:px-6 md:ml-4 md:text-sm xl:px-8 xl:text-base'
        break
    }

    return () => (
      <RouterLink to={props.to} class={tailwindClasses.value}>
        {slots.default?.()}
      </RouterLink>
    )
  },
})
