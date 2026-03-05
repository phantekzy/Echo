import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { memberships, organizations, users } from "../db/schema.js";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "../types/index.js";
import * as argon2 from "argon2";

export class AuthService {
  static async register(data: RegisterInput) {
    const hashedPassword = await argon2.hash(data.password);
    const slug = data.orgName.toLowerCase().replace(/\s+/g, "-");
    return await db.transaction(async (tx) => {
      //add a user
      const [newUser] = await tx
        .insert(users)
        .values({
          email: data.email,
          passwordHash: hashedPassword,
        })
        .returning();
      // add an org
      const [newOrg] = await tx
        .insert(organizations)
        .values({
          name: data.orgName,
          slug: slug,
        })
        .returning();
      // owner membership
      await tx.insert(memberships).values({
        userId: newUser.id,
        orgId: newOrg.id,
        role: "OWNER",
      });
      return { userId: newUser.id, orgId: newOrg.id };
    });
  }
  static async login(data: LoginInput): Promise<AuthResponse> {
    const user = await db.query.users.findMany({
      where: eq(users.email, data.email),
    });
  }
}
