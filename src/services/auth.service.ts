import type { RegisterInput } from "../types/index.js";
import * as argon2 from "argon2";
export class AuthService {
  static async register(data: RegisterInput) {
    const hashedPassword = await argon2.hash(data.password);
  }
}
