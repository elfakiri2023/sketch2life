import { writable } from 'svelte/store'

export const currentStep = writable(1)
export const caption = writable('')
export const prompt = writable('')
export const userPrompt = writable('')
