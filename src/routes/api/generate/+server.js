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

	console.log('------------------------------')

	try {
		// @cf/llava-hf/llava-1.5-7b-hf
		// @cf/unum/uform-gen2-qwen-500m
		const captionRes = await locals.AI.run('@cf/llava-hf/llava-1.5-7b-hf', {
			image: Array.from(dataURLToBuffer(img)),
			prompt: 'Given this black-and-white sketch, describe the objects, their arrangement, and any actions or scenes depicted. Include any important details that would help someone understand the image without seeing it. Do not add any information that is not directly visible in the image. The response should be detailed and descriptive, providing a clear picture of the scene.',
			max_tokens: 512
		})

		const caption = captionRes.description.replaceAll('"', '').trim()
		console.log('-- 1: start: @cf/llava-hf/llava-1.5-7b-hf --')
		console.log(caption)
		console.log('-- 1: end --')

		// @cf/meta/llama-3.1-8b-instruct
		// @cf/meta/llama-2-7b-chat-fp16
		const promptRes = await locals.AI.run('@cf/meta/llama-3.1-8b-instruct', {
			messages: [
				{
					role: 'system',
					content: 'Ignore any background details in the following caption. Focus only on the objects and elements explicitly mentioned.'
				},
				{
					role: 'user',
					content: `Given a caption of a rough sketch, generate a prompt to generate a better detailed image for the sketch. Keep in mind that the caption's black and white color should be ignored and correct colors should be added to the image. The response should only contain the raw prompt.
            		Here is the caption for the rough sketch:
                    ${caption}`
					/* content: `Using the following description, generate a prompt that can be used to create a photorealistic image with a Stable Diffusion model: ${caption}. The response should only contain the raw prompt` */
				}
			]
		})
		const prompt = promptRes.response.replaceAll('"', '').trim()
		console.log('-- 2 start: @cf/meta/llama-3.1-8b-instruct --')
		console.log(prompt)
		console.log('-- 2 end --')

		// @cf/stabilityai/stable-diffusion-xl-base-1.0
		// @cf/lykon/dreamshaper-8-lcm
		const imgRes = await locals.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
			prompt: prompt
		})

		return new Response(imgRes, {
			headers: {
				'Content-Type': 'image/png'
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
