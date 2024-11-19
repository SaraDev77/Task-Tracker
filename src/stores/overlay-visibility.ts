import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', {
  state: () => ({
    visible: false,
  }),

  actions: {
    openOverlay() {
      this.visible = true
    },
    closeOverlay() {
      this.visible = false
    },
  },
  
})
