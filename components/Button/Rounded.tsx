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
      'inline-block rounded-full align-baseline text-center text-xs font-bold shadow-[0_0_8px] tracking-wide transition-all duration-300 cursor-pointer ripple',
    )

    const iconClasses = ref('inline-block align-text-bottom')
    const textClasses = ref('')

    switch (props.color) {
      case 'orange':
        tailwindClasses.value +=
          ' border-orange-400 shadow-orange-400 hover:bg-orange-400 active:bg-orange-500 text-orange-400 hover:text-gray-100'
        break
      default:
        tailwindClasses.value +=
          ' border-gray-400 shadow-gray-700 hover:bg-gray-400 active:bg-gray-500 text-gray-700 hover:text-gray-100'
        break
    }

    switch (props.size) {
      default:
        tailwindClasses.value +=
          ' px-3 py-2 ml-2 text-xs md:px-4 md:ml-4 md:text-sm xl:px-6 xl:ml-4 xl:text-base'
        iconClasses.value +=
          ' h-4 md:h-5 xl:h-6 opacity-0 -mr-4 md:opacity-100 md:mr-1 transition-all duration-300'
        textClasses.value +=
          ' opacity-100 md:opacity-0 md:-ml-7 xl:-ml-9 md:hover:opacity-100 md:hover:ml-1 transition-all duration-300'
        break
    }

    return () => (
      <RouterLink to={props.to} class={tailwindClasses.value}>
        {slots.icon && <span class={iconClasses.value}>{slots.icon()}</span>}
        {slots.text && <span class={textClasses.value}>{slots.text()}</span>}
        {slots.default && <span>{slots.default()}</span>}
      </RouterLink>
    )
  },
})
