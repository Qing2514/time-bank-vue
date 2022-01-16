export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'dark',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    pattern: {
      type: String,
      default: '',
    },
    warning: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    validate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const value = ref(props.value)

    const textColor = () => {
      if (props.color === 'light') {
        return 'text-gray-100'
      } else {
        return 'text-gray-500'
      }
    }

    const borderColor = () => {
      if (props.color === 'light') {
        return 'border-gray-100'
      } else {
        return 'border-gray-500'
      }
    }

    const inputClass = ref(
      tailwindClasses(
        'bg-transparent outline-none border-b pt-5 px-2 w-full h-[calc(2.5rem+2px)] text-sm',
      )
        .add(borderColor())
        .toString(),
    )

    const labelClass = ref(
      tailwindClasses(
        'absolute font-semibold left-2 top-2 transition-all duration-300',
      )
        .add(textColor())
        .toString(),
    )

    if (props.type === 'datetime-local') {
      labelClass.value = tailwindClasses(labelClass.value)
        .remove('top-2')
        .add('text-xs top-0')
        .toString()
    }

    const borderClass = ref(
      tailwindClasses(
        'h-full w-full transition-all duration-300 invisible animate-faster animate-slideOutLeft',
      ).toString(),
    )

    const warningClass = ref(
      tailwindClasses(
        'inline-block text-red-700 text-xs whitespace-nowrap transition-all duration-300 invisible animate-faster animate-fadeOutUp',
      ).toString(),
    )

    const onFocus = () => {
      labelClass.value = tailwindClasses(labelClass.value)
        .remove('top-2')
        .remove(textColor())
        .add('text-amber-800 text-xs top-0')
        .toString()
      borderClass.value = tailwindClasses(borderClass.value)
        .remove('animate-slideOutLeft invisible')
        .add('bg-amber-800 animate-slideInLeft')
        .toString()
    }

    const onBlur = () => {
      if (props.type !== 'datetime-local' && value.value.length === 0) {
        labelClass.value = tailwindClasses(labelClass.value)
          .remove('text-xs top-0')
          .add('top-2')
          .toString()
      }
      if (value.value.match(props.pattern)) {
        labelClass.value = tailwindClasses(labelClass.value)
          .remove('text-amber-800 text-red-700')
          .add(textColor())
          .toString()
        borderClass.value = tailwindClasses(borderClass.value)
          .remove('bg-red-700 animate-slideInLeft')
          .add('bg-amber-800 animate-slideOutLeft')
          .toString()
        warningClass.value = tailwindClasses(warningClass.value)
          .remove('animate-fadeInDown invisible')
          .add('animate-fadeOutUp')
          .toString()
      } else {
        labelClass.value = tailwindClasses(labelClass.value)
          .remove('text-amber-800')
          .add('text-red-700')
          .toString()
        borderClass.value = tailwindClasses(borderClass.value)
          .remove('bg-amber-800')
          .add('bg-red-700')
          .toString()
        warningClass.value = tailwindClasses(warningClass.value)
          .remove('animate-fadeOutUp invisible')
          .add('animate-fadeInDown')
          .toString()
        setTimeout(() => {
          labelClass.value = tailwindClasses(labelClass.value)
            .add('animate-headShake')
            .toString()
        }, 300)
        setTimeout(() => {
          labelClass.value = tailwindClasses(labelClass.value)
            .remove('animate-headShake')
            .toString()
        }, 800)
      }
    }

    const onInput = () => {
      emit('update:value', value.value)
      if (value.value?.match(props.pattern)) {
        labelClass.value = tailwindClasses(labelClass.value)
          .remove('text-red-700')
          .add('text-amber-800 ')
          .toString()
        borderClass.value = tailwindClasses(borderClass.value)
          .remove('bg-red-700')
          .add('bg-amber-800')
          .toString()
        warningClass.value = tailwindClasses(warningClass.value)
          .remove('animate-fadeInDown invisible')
          .add('animate-fadeOutUp')
          .toString()
      }
    }

    watch(
      () => props.value,
      val => {
        value.value = val
      },
    )

    watch(
      () => props.validate,
      () => onBlur(),
    )

    return () => (
      <div class='relative h-16'>
        <input
          class={inputClass.value}
          onFocus={onFocus}
          onBlur={onBlur}
          onInput={onInput}
          v-model={value.value}
          type={props.type}
        />
        <span class={labelClass.value}>{props.label}</span>
        <div class='absolute overflow-hidden top-10 h-0.5 w-full'>
          <div class={borderClass.value}></div>
        </div>
        <div class='overflow-hidden pl-2 leading-tight'>
          <span class={warningClass.value}>{props.warning}</span>
        </div>
      </div>
    )
  },
})
