CREATE TABLE IF NOT EXISTS "itemImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"item_id" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"blob_url" text NOT NULL,
	"is_banner" boolean,
	CONSTRAINT "itemImages_item_id_is_banner_unique" UNIQUE("item_id","is_banner")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "itemImages" ADD CONSTRAINT "itemImages_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
