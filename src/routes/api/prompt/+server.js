export const POST = async ({ request, locals }) => {
	const { caption } = await request.json()

	if (!caption) {
		return new Response(JSON.stringify({ error: 'Bad Request' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	try {
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
				}
			]
		})

		const prompt = promptRes.response.replaceAll('"', '').trim()

		return new Response(JSON.stringify({ prompt }), {
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
