CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" varchar(1000),
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
