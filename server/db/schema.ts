import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	male_name: text("male_name").notNull(),
	female_name: text("female_name").notNull(),
});

export const wedding = sqliteTable("wedding", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	user_id: text("user_id").notNull(),
	send_at: text("send_at").notNull(),
	date: text("date").notNull(),
	time: text("time").notNull(),
	place: text("place").notNull(),
});

export const guest = sqliteTable("guest", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	user_id: text("user_id").notNull(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	status: text("status").notNull(),
	message: text("message").notNull(),
	information: text("information").notNull(),
});
