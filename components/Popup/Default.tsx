import { useStore } from '~~/stores/popup'

export default defineComponent(() => {
  const popup = useStore()
  const message = ref('')

  const popupClass = ref(
    'absolute transition-all -bottom-6 inset-x-0 mx-auto z-20 rounded-md shadow px-4 md:px-6 py-2 border-2 font-semibold bg-opacity-90 w-fit',
  )

  watch(
    () => popup.type,
    type => {
      if (typeof type === 'string') {
        switch (type) {
          case 'error':
            popupClass.value = tailwindClasses(popupClass.value)
              .remove('bg-green-200')
              .remove('border-green-400')
              .add('bg-red-200')
              .add('border-red-400')
              .toString()
            break
          default:
            popupClass.value = tailwindClasses(popupClass.value)
              .remove('bg-red-200')
              .remove('border-red-400')
              .add('bg-green-200')
              .add('border-green-400')
              .toString()
            break
        }
      }
    },
  )

  watch(
    () => popup.message,
    text => (message.value = typeof text === 'string' ? text : ''),
  )

  watch(
    () => popup.show,
    show => {
      if (show) {
        popupClass.value = tailwindClasses(popupClass.value)
          .remove('-bottom-6')
          .add('bottom-2')
          .toString()

        if (popup.type !== 'error') {
          setTimeout(() => {
            popup.$state = {
              show: false,
              message: '',
              type: '',
            }
          }, 2000)
        } else {
          setTimeout(() => {
            popup.$state = {
              show: false,
              message: '',
              type: '',
            }
          }, 10000)
        }
      } else {
        popupClass.value = tailwindClasses(popupClass.value)
          .remove('bottom-2')
          .add('-bottom-6')
          .toString()
      }
    },
  )

  return () => (
    <div class={popupClass.value}>
      <span v-text={message.value} />
    </div>
  )
})
