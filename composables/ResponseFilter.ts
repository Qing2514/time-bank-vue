import { useStore } from '~~/stores/popup'

export const responsePopupFilter = (status: number, message: string) => {
  const popup = useStore()
  if (status >= 400) {
    popup.$patch({ type: 'error', message })
    if (status === 403) {
      useRouter().push('/login')
    }
  } else {
    popup.$patch({ type: 'success', message })
  }
  setTimeout(() => popup.$patch({ show: true }), 100)
  return status
}

export const responseFilter = (status: number, message: string) => {
  const popup = useStore()
  if (status >= 400) {
    popup.$patch({ type: 'error', message })
    if (status === 403) {
      useRouter().push('/login')
    }
    setTimeout(() => popup.$patch({ show: true }), 100)
  }
  return status
}

export const serverError = () => {
  const popup = useStore()
  popup.$patch({ type: 'error', message: 'Server error' })
  useRouter().push('/')
  setTimeout(() => popup.$patch({ show: true }), 100)
}
