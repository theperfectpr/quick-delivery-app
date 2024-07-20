import {  sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fname: varchar("fname",{ length: 100 }).notNull(),
    lname: varchar("lname",{ length: 100 }).notNull(),
    email: varchar("email",{ length: 100 }).unique().notNull(),
    provider: varchar("provider",{ length: 20 }),
    externalId: varchar("external_id",{ length: 100 }).notNull(),
    image: text("image"),
    role: varchar("role",{ length: 12 }).notNull().default("customer"),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`)
})

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    image: text("image").notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`)
})