import { defineStore } from 'pinia'

export const useStore = defineStore('popup', {
  state: () => {
    return {
      show: false,
      type: '',
      message: '',
    }
  },
})
