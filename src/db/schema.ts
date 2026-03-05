import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["OWNER", "ADMIN", "MEMBER"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const memberships = pgTable(
  "memberships",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orgId: integer("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    role: roleEnum("role").default("MEMBER").notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.orgId] })],
);

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  s3Key: text("s3_key").notNull().unique(),
  fileSize: integer("file_size").notNull(),
});
