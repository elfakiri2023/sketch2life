import { savedTable } from '$lib/server/db/schema'
import { json } from '@sveltejs/kit'
import { eq, and } from 'drizzle-orm'

export const POST = async ({ request, locals }) => {
	const { id, name } = await request.json()

	if (!locals.user || !locals.user.id) {
		return json({ status: 'error', message: 'You are not logged in' }, { status: 401 })
	}

	if (!id || !name) {
		return json({ status: 'error', message: 'Bad Request' }, { status: 400 })
	}

	try {
		const object = await locals.bucket.get(name)
		if (object) {
			await locals.bucket.delete(name)
		}

		const result = await locals.DB.delete(savedTable).where(and(eq(savedTable.user_id, locals.user.id), eq(savedTable.id, id)))

		if (result.success) {
			return json({ status: 'success', message: 'Sketch & Image deleted from bookmarks' })
		}

		return json({ status: 'error', message: 'Failed to delete Sketch & Image to bookmarks' }, { status: 500 })
	} catch (error) {
		console.error(error)
		return json({ status: 'error', message: 'Internal Server Error' }, { status: 500 })
	}
}
