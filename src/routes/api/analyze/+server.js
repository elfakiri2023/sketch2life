import { dataURLToBuffer } from '$lib/server/utils'
import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
	const { img } = await request.json()

	if (!img) {
		return json({ status: 'error', message: 'Bad Request' }, { status: 400 })
	}

	try {
		// @cf/meta/llama-3.1-8b-instruct
		// @cf/meta/llama-2-7b-chat-fp16
		const captionRes = await locals.AI.run('@cf/llava-hf/llava-1.5-7b-hf', {
			image: Array.from(dataURLToBuffer(img)),
			prompt: 'Given this black-and-white sketch, describe the objects, their arrangement, and any actions or scenes depicted. Include any important details that would help someone understand the image without seeing it. Do not add any information that is not directly visible in the image. The response should be detailed and descriptive, providing a clear picture of the scene.',
			max_tokens: 512
		})

		const caption = captionRes.description.replaceAll('"', '').trim()

		return json({ caption })
	} catch (error) {
		console.error(error)
		return json({ status: 'error', message: 'Internal Server Error' }, { status: 500 })
	}
}
