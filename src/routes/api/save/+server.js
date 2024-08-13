const dataURLToBuffer = (dataURL) => {
	const base64 = dataURL.split(',')[1]
	const binaryString = atob(base64)
	return Uint8Array.from(binaryString, (c) => c.charCodeAt(0))
}

export const POST = async ({ request, locals }) => {
	const { image, lines } = await request.json()

	console.log('image', image)
	console.log('lines', lines)

	if (!image || !lines) {
		return new Response(JSON.stringify({ error: 'Bad Request' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	try {
		const imageBuffer = dataURLToBuffer(image)

		return new Response(JSON.stringify({ success: true }), {
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
