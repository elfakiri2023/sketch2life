import { dataURLToBuffer, slugifyString } from '$lib/server/utils'
import { savedTable } from '$lib/server/db/schema'
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

		const uploadedImage = await locals.bucket.put(imageName, imageBuffer)

		console.log(uploadedImage)

		if (uploadedImage.key) {
			const result = await locals.DB.insert(savedTable).values({
				image_name: uploadedImage.key,
				sketch: JSON.stringify(lines),
				user_id: locals.user.id
			})

			if (result.success) {
				return json({ status: 'success', message: 'Sketch & Image saved to bookmarks' })
			}
		}

		return json({ status: 'error', message: 'Failed to save Sketch & Image to bookmarks' }, { status: 500 })
	} catch (error) {
		console.error(error)
		return json({ status: 'error', message: 'Internal Server Error' }, { status: 500 })
	}
}
