declare global {
	namespace App {
		interface Platform {
			env: {
				KV: KVNamespace
				DB: D1Database
				BUCKET: R2Bucket
			}
		}
	}
}
