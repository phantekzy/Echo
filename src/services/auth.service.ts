import { db } from "../db/index.js";
import { organizations, users } from "../db/schema.js";
import type { RegisterInput } from "../types/index.js";
import * as argon2 from "argon2";
export class AuthService {
  static async register(data: RegisterInput) {
    const hashedPassword = await argon2.hash(data.password);
    const slug = data.orgName.toLowerCase().replace(/\s+/g, "-");
    return await db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(users)
        .values({
          email: data.email,
          passwordHash: hashedPassword,
        })
        .returning();

      const [newOrg] = await tx
        .insert(organizations)
        .values({
          name: data.orgName,
          slug: slug,
        })
        .returning();
    });
  }
}
