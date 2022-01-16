import { computed } from 'vue'
import { findIconDefinition, IconName } from '@fortawesome/fontawesome-svg-core'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const definition = computed(() =>
      findIconDefinition({
        prefix: 'fas',
        iconName: props.icon as IconName,
      }),
    )

    const width = computed(() => definition.value.icon[0])
    const height = computed(() => definition.value.icon[1])
    const svgPaths = computed(() =>
      typeof definition.value.icon[4] === 'string'
        ? [definition.value.icon[4]]
        : definition.value.icon[4],
    )

    return () => (
      <svg
        class='h-full w-full'
        xmlns='http://www.w3.org/2000/svg'
        viewBox={'0 0 ' + width.value + ' ' + height.value}
      >
        {svgPaths.value.map(path => (
          <path class='text-inherit' d={path} fill='currentColor' />
        ))}
      </svg>
    )
  },
})
