import { useStore } from '~~/stores/user'

export const getUsername = () => {
  if (
    useCookie(import.meta.env.BAMPO_ACCESS_TOKEN).value === 'undefined' ||
    useCookie(import.meta.env.BAMPO_ACCESS_TOKEN).value === ''
  ) {
    useRouter().push('/login')
  } else {
    return useStore().$state.username
  }
}
