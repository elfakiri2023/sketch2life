import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('user', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
})

export const savedTable = sqliteTable('saved', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name'),
    user_id: text('user_id')
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' })
})

export const sessionTable = sqliteTable('session', {
    id: text('id').notNull().primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => userTable.id),
    expiresAt: integer('expires_at').notNull()
})
