/**
 *
 * @param {string} key
 * @param {string|object} value
 * @returns {Promise<import('@skeletonlabs/skeleton').ToastSettings|Object>}
 */
export async function sendRequest(endpoint, obj) {
	let response = { success: false, message: 'Something went wrong!', background: 'variant-filled-error' }

	const request = await fetch(`/api/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	})

	if (!request.ok) {
		response.message = 'Oops! Something went wrong. Please try again later.'
		return response
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
		ok: response.success,
		data: data.data || {},
		message: response.message,
		background: response.success ? 'variant-filled-primary' : 'variant-filled-warning'
	}

	return toast
}
