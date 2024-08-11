export const POST = async ({ request, locals }) => {
	const { prompt } = await request.json()

	if (!prompt) {
		return new Response(JSON.stringify({ error: 'Bad Request' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		})
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
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}
