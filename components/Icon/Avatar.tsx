import CryptoJS from 'crypto-js'
import { useStore } from '~~/stores/user'

export default defineComponent({
  props: {
    username: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    type: {
      type: String,
      default: 'all',
    },
  },
  setup(props) {
    const email = ref('')
    const username = ref(props.username)

    const gravatar = ref(
      'https://cravatar.cn/avatar/'
        .concat(CryptoJS.MD5(email.value).toString())
        .concat('?s='),
    )

    const fetchData = async () => {
      const { data: userInfoResponse } = (await useFetch(
        import.meta.env.BAMPO_REST_HOST.concat('api/v1/user/').concat(
          props.username,
        ),
        {
          credentials: 'include',
        },
      )) as _AsyncData<InfoResponse<UserInfo>>

      if (
        responseFilter(
          userInfoResponse.value?.status,
          userInfoResponse.value?.message,
        ) === 200
      ) {
        username.value = userInfoResponse.value.data.username
        if (props.username === '') {
          useStore().$patch({ username: username.value })
        }
        email.value = userInfoResponse.value.data.email
        gravatar.value = 'https://cravatar.cn/avatar/'
          .concat(CryptoJS.MD5(email.value.trim().toLowerCase()).toString())
          .concat('?s=')
      }
    }

    const imgClass = ref('inline-block rounded-full mx-auto')

    const usernameClass = ref('ml-2 align-middle font-semibold')

    switch (props.size) {
      case 'xs':
        gravatar.value += '24'
        imgClass.value = tailwindClasses(imgClass.value).add('h-6').toString()
        usernameClass.value = tailwindClasses(usernameClass.value)
          .add('text-sm')
          .toString()
        break
      case 'sm':
        gravatar.value += '32'
        imgClass.value = tailwindClasses(imgClass.value).add('h-8').toString()
        break
      case 'lg':
        gravatar.value += '64'
        imgClass.value = tailwindClasses(imgClass.value)
          .remove('inline-block')
          .add('h-16 mb-2')
          .toString()
        usernameClass.value = tailwindClasses(usernameClass.value)
          .remove('ml-2')
          .add('text-xl font-bold block mx-auto')
          .toString()
        break
      case 'xl':
        gravatar.value += '96'
        imgClass.value = tailwindClasses(imgClass.value)
          .remove('inline-block')
          .add('h-24 mb-4')
          .toString()
        usernameClass.value = tailwindClasses(usernameClass.value)
          .remove('ml-2')
          .add('text-xl font-bold block mx-auto')
          .toString()
        break
      default:
        gravatar.value += '48'
        imgClass.value = tailwindClasses(imgClass.value).add('h-12').toString()
        usernameClass.value = tailwindClasses(usernameClass.value)
          .remove('ml-2')
          .add('text-lg ml-4')
          .toString()
        break
    }

    switch (props.type) {
      case 'text':
        imgClass.value = tailwindClasses(imgClass.value)
          .remove('visible')
          .add('hidden')
          .toString()
        break
      case 'img':
        usernameClass.value = tailwindClasses(usernameClass.value)
          .remove('visible')
          .add('hidden')
          .toString()
        break
      default:
        usernameClass.value = tailwindClasses(usernameClass.value)
          .remove('hidden')
          .add('visible')
          .toString()
        imgClass.value = tailwindClasses(imgClass.value)
          .remove('hidden')
          .add('visible')
          .toString()
        break
    }

    onMounted(async () => await fetchData())

    watch(
      () => props.username,
      async () => await fetchData(),
    )

    return () => (
      <div class='inline-block'>
        <img
          onLoad={async () => await fetchData()}
          class={imgClass.value}
          src={gravatar.value}
        />
        <span class={usernameClass.value} v-text={username.value} />
      </div>
    )
  },
})
