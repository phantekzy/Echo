import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { memberships, organizations, users } from "../db/schema.js";
import jwt from "jsonwebtoken";
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
    const user = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });
    if (!user || !(await argon2.verify(user.passwordHash, data.password))) {
      throw new Error("Invalid Email or password");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
