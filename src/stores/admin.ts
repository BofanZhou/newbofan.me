import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const token = ref(localStorage.getItem('admin-token') || '')
  const username = ref(localStorage.getItem('admin-username') || '')
  const isAuthenticated = computed(() => !!token.value)

  function setAuth(newToken: string, newUsername: string) {
    token.value = newToken
    username.value = newUsername
    localStorage.setItem('admin-token', newToken)
    localStorage.setItem('admin-username', newUsername)
  }

  function logout() {
    token.value = ''
    username.value = ''
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-username')
  }

  return {
    token,
    username,
    isAuthenticated,
    setAuth,
    logout,
  }
})
