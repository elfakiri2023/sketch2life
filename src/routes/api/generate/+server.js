import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
	const { prompt } = await request.json()

	if (!prompt) {
		return json({ status: 'error', message: 'Bad Request' }, { status: 400 })
	}

	try {
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
		return json({ status: 'error', message: 'Internal Server Error' }, { status: 500 })
	}
}
