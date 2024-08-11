import { fail, redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { userTable } from '$lib/server/db/schema'
import { verifyPasswordHash } from '$lib/server/password-hasher'
import { validateCaptcha } from '$lib/server/captcha'
import { z } from 'zod'

export const load = async ({ locals }) => {
	if (locals.user) return redirect(302, `/`)
	return {}
}

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const formData = await request.formData()
		const username = formData.get('username')
		const password = formData.get('password')
		const captchaToken = formData.get('cf-turnstile-response')
		const ip = request.headers.get('CF-Connecting-IP') ?? ''

		const schema = z.object({
			username: z
				.string()
				.min(3, { message: 'Username must be at least 3 characters' })
				.max(32, { message: 'Username must be at most 32 characters' })
				.regex(/^[a-z0-9_-]+$/, { message: 'Invalid username' }),
			password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(255, { message: 'Password must be at most 255 characters' }),
			captchaToken: z.string().min(1, { message: 'Captcha Token must not be empty' })
		})

		try {
			schema.parse({ username, password, captchaToken })
		} catch (error) {
			return fail(400, {
				// @ts-ignore
				message: error.errors[0]?.message
			})
		}

		const outcome = await validateCaptcha(ip, captchaToken)

		if (!outcome.success) {
			return fail(400, {
				message: 'Error with captcha, please try again.'
			})
		}

		const existingUser = await locals.DB.query.userTable.findFirst({
			where: eq(userTable.username, username)
		})

		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect username or password'
			})
		}

		const validPassword = await verifyPasswordHash(password, existingUser.password)
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			})
		}
		const lucia = locals.lucia
		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})

		return redirect(302, `/`)
	}
}
