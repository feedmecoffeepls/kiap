import { pgTable, serial, text, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  bid_amount: integer("bid_amount").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  item_id: integer("item_id").references(() => items.id), // The Item that was bid on
  profile_id: text("profile_id").references(() => profiles.user_id), // Represents the person bidding
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  description: text("description"),
  selling_price: integer("selling_price").notNull(),
  title: text("title").notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  profile_id: text("profile_id").references(() => profiles.user_id), // The person who listed the item
});

export const profiles = pgTable("profiles", {
  user_id: text("user_id").primaryKey().notNull(), // Clerk User Id
  avatar: text("avatar"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  username: text("username").notNull().unique(), // Searchable username
});

export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  bid_id: integer("bid_id").references(() => bids.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  item_id: integer("item_id").references(() => items.id),
  profile_id: text("profile_id").references(() => profiles.user_id), // ID of the buyer
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const bidsRelations = relations(bids, ({ one }) => ({
  item: one(items, {
    fields: [bids.item_id],
    references: [items.id],
  }),
  profile: one(profiles, {
    fields: [bids.profile_id],
    references: [profiles.user_id],
  }),
}));

export const itemsRelations = relations(items, ({ one, many }) => ({
  bids: many(bids),
  sales: many(sales),
  profile: one(profiles, {
    fields: [items.profile_id],
    references: [profiles.user_id],
  }),
}));

export const profilesRelations = relations(profiles, ({ many }) => ({
  bids: many(bids),
  sales: many(sales),
}));

export const salesRelations = relations(sales, ({ one }) => ({
  bid: one(bids, {
    fields: [sales.bid_id],
    references: [bids.id],
  }),
  item: one(items, {
    fields: [sales.item_id],
    references: [items.id],
  }),
  profile: one(profiles, {
    fields: [sales.profile_id],
    references: [profiles.user_id],
  }),
}));

export type InsertBid = typeof bids.$inferInsert;
export type SelectBid = typeof bids.$inferSelect;

export type InsertItem = typeof items.$inferInsert;
export type SelectItem = typeof items.$inferSelect;

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertSale = typeof sales.$inferInsert;
export type SelectSale = typeof sales.$inferSelect;
