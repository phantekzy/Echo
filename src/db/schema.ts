import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["OWNER", "ADMIN", "MEMBER"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
