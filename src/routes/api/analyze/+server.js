const dataURLToBuffer = (dataURL) => {
	const base64 = dataURL.split(',')[1]
	const binaryString = atob(base64)
	return Uint8Array.from(binaryString, (c) => c.charCodeAt(0))
}

export const POST = async ({ request, locals }) => {
	const { img } = await request.json()

	if (!img) {
		return new Response(JSON.stringify({ error: 'Bad Request' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		})
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

		return new Response(JSON.stringify({ caption }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error) {
		console.error(error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}
