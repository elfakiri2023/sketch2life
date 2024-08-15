import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
	const { caption, userPrompt } = await request.json()

	if (!caption) {
		return json({ status: 'error', message: 'Bad Request' }, { status: 400 })
	}

	try {
		const systemMessage = {
			role: 'system',
			content: 'Ignore any background details in the following caption. Focus only on the objects and elements explicitly mentioned.'
		}

		const userMessage = {
			role: 'user',
			content: `Given a caption of a rough sketch, generate a prompt to generate a better detailed image for the sketch. Keep in mind that the caption's black and white color should be ignored and correct colors should be added to the image. The response should only contain the raw prompt.
				Here is the caption for the rough sketch:
				${caption}
				${userPrompt ? `\nAdditional details to include: ${userPrompt}` : ''}`
		}

		const messages = [systemMessage, userMessage]

		if (userPrompt && userPrompt.trim() !== '') {
			messages.push({
				role: 'system',
				content: 'Ensure that the additional details provided by the user are incorporated into the final prompt.'
			})
		}

		const promptRes = await locals.AI.run('@cf/meta/llama-3.1-8b-instruct', {
			messages
		})

		const prompt = promptRes.response.replaceAll('"', '').trim()

		return json({ status: 'success', message: 'Prompt generated successfully', prompt })
	} catch (error) {
		console.error(error)
		return json({ status: 'error', message: 'Internal Server Error' }, { status: 500 })
	}
}
