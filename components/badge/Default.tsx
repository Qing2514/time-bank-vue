export default defineComponent((_props, { slots }) => {
  return () => (
    <span class='rounded px-1 mr-1 bg-orange-500 text-white whitespace-nowrap'>
      {slots.default?.()}
    </span>
  )
})
