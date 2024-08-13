/**
 *
 * @param {string} key
 * @param {string|object} value
 * @returns {Promise<import('@skeletonlabs/skeleton').ToastSettings|Object>}
 */
export async function sendRequest(obj, endpoint, isBlob = false) {
	let response = { success: false, message: 'Something went wrong!' }

	const request = await fetch(`/api/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	})

	if (!request.ok) {
		response.message = 'Oops! Something went wrong. Please try again later.'
	}

	const data = await request.json()

	if (data.status === 'error') {
		response.message = data.message
	}

	if (data.status === 'success') {
		response.success = true
	}

	response.message = data.message

	const toast = {
		data: data.data,
		message: response.message,
		background: response.success ? 'variant-filled-primary' : 'variant-filled-warning'
	}

	return toast
}
