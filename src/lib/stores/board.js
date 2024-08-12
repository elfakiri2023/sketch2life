import { writable } from 'svelte/store'

export const imgUrl = writable('')
export const ref = writable(null)
export const isDrawing = writable(false)
export const tool = writable('pen')
export const color = writable('#fff')
export const lineWidth = writable(1)
export const lines = writable([])
export const canvasSize = writable({
	width: 200,
	height: 200
})
