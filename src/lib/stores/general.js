import { writable } from 'svelte/store'

export const turnstileLoaded = writable(false)
export const turnstileMounted = writable(false)
export const loggedIn = writable(true)
export const currentPage = writable('Create')
export const mobileNavOpen = writable(false)
export const user = writable(null)
