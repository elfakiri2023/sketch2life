export function slugifyString(str) {
	return str
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/\./g, '-')
		.replace(/-+/g, '-')
		.replace(/[^a-z0-9-]/g, '-')
}

export function dataURLToBuffer(dataURL) {
	const base64 = dataURL.split(',')[1]
	const binaryString = atob(base64)
	return Uint8Array.from(binaryString, (c) => c.charCodeAt(0))
}
