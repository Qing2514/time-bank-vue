export default defineComponent((_props, { slots }) => {
  const tailwindClasses = ref('')

  watch(useRoute(), () => {
    tailwindClasses.value =
      'transition-all duration-700 h-screen' + ' overflow-hidden'
    switch (useRoute().name) {
      case 'index':
        tailwindClasses.value += ' w-full min-w-full'
        break
      case 'login':
      case 'register':
        tailwindClasses.value +=
          ' w-0 min-w-0 delay-200 md:w-3/5 md:min-w-[calc(100%/5*3)] md:delay-[0ms]'
        break
      default:
        tailwindClasses.value +=
          ' w-12 min-w-[3rem] md:w-1/3 md:min-w-[calc(100%/3)]'
        break
    }
  })

  const contentClasses = ref('transition-all ease-in delay-500')

  return () => (
    <div class={tailwindClasses.value}>
      <div class={contentClasses.value}>{slots.default?.()}</div>
    </div>
  )
})
