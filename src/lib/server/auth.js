import { Lucia } from 'lucia'
import { D1Adapter } from '@lucia-auth/adapter-sqlite'
import { dev } from '$app/environment'

/**
 * @param {import('cfw-bindings-wrangler-bridge').D1Database$} db
 * @param {object} env
 */
export function initializeLucia(db, env = {}) {
	const adapter = new D1Adapter(db, {
		user: 'user',
		session: 'session'
	})

	return new Lucia(adapter, {
		sessionCookie: { attributes: { secure: !dev } },
		getUserAttributes: (attributes) => {
			return {
				username: attributes.username
			}
		}
	})
}
