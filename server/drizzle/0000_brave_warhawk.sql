CREATE TABLE `guest` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`status` text NOT NULL,
	`message` text NOT NULL,
	`information` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`male_name` text NOT NULL,
	`female_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wedding` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`send_at` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`place` text NOT NULL
);
