import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ValidateArg } from "../../../middlewares";
import { JWTPayload } from "../../../types/jwtPayload";
import ExpectedError from "../../../utils/expectedError";
import { logError } from "../../../utils/logger";
import { UserModel } from "../../user/entities/User";
import sAuth from "../helpers/socialAuth";
import { LoginInput } from "../inputs/loginInput";
import { RegisterInput } from "../inputs/registerInput";
import { AuthResponse } from "../returnTypes/authResponse";

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  @ValidateArg(RegisterInput.schema, "input")
  async register(
    @Arg("input")
    { email, password, ...rest }: RegisterInput
  ): Promise<AuthResponse> {
    const existingUser = await UserModel.findOne({ email }).lean();

    if (existingUser) throw new ExpectedError("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword, ...rest });
    await user.save();

    const payload: JWTPayload = {
      userId: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "aslkdfjoiq12312"
    );

    return { user, token };
  }

  @Mutation(() => AuthResponse)
  @ValidateArg(LoginInput.schema, "input")
  async login(
    @Arg("input") { email, password }: LoginInput
  ): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ExpectedError("Invalid Credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new ExpectedError("Invalid Credentials");
    }

    const payload: JWTPayload = {
      userId: user.id,
    };

    // Store it on session object
    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "aslkdfjoiq12312"
    );

    return { user, token };
  }

  @Mutation(() => AuthResponse)
  async authFacebook(@Arg("token") fbToken: string): Promise<AuthResponse> {
    const user = await sAuth.driver("facebook").getUserByToken(fbToken);
    logError(user);

    throw new Error("ok");
  }
}
