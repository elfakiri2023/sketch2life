import { dataURLToBuffer, slugifyString } from '$lib/server/utils'
import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
	const { image, lines } = await request.json()

	if (!locals.user || !locals.user.id) {
		return json({ status: 'error', message: 'You are not logged in' }, { status: 401 })
	}

	if (!image || !lines) {
		return json({ status: 'error', message: 'Bad Request' }, { status: 400 })
	}

	try {
		const imageBuffer = dataURLToBuffer(image)
		const imageName = `${slugifyString(locals.user.username)}-${slugifyString(Date.now().toString())}.png`

		const uploadedImage = await locals.bucket.put(imageName, image)

		console.log('uploadedImage')
		console.log(uploadedImage)

		return json({ status: 'success' })
	} catch (error) {
		console.error(error)
		return json({ status: 'error', message: 'Internal Server Error' }, { status: 500 })
	}
}
