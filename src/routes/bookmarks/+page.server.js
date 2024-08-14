import { redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { savedTable } from '$lib/server/db/schema'

export const load = async ({ locals }) => {
	if (!locals.user.id) return redirect(302, '/')

	const bookmarks = await locals.DB.select().from(savedTable).where(eq(savedTable.user_id, locals.user.id))

	return { user: locals.user, bookmarks }
}
