import { object, string, TypeOf } from "zod";

const createUserSchema = object({
  body: object({
    email: string({ required_error: `email is required` }).email(
      "must be a valid email"
    ),
    username: string({ required_error: `the field name is required` }),
    first_name: string({ required_error: `the field name is required` }),
    address: string({ required_error: `the field name is required` }),
    address2: string({ required_error: `the field name is required` }),
    city: string({ required_error: `the field name is required` }),
    country: string({ required_error: `the field name is required` }),
    verificationCode: string({ required_error: `the field name is required` }),
    last_name: string({ required_error: `the field name is required` }),
    hashed_password: string({ required_error: `password is required` }).min(
      8,
      `password must be 8 characters long`
    ),
    confirm_password: string({
      required_error: `confirm_password is required`,
    }),
  }).refine((data) => data.hashed_password === data.confirm_password, {
    message: `password and confirm_password mismatch`,
    path: ["confirm_password"],
  }),
});

const verifyUserSchema = object({
  params: object({
    username: string({ required_error: `the field name is required` }),
    verificationcode: string({ required_error: `the field name is required` }),
  }),
});

const forgotPasswordSchema = object({
  body: object({
    email: string({ required_error: `email is required` }).email(
      "must be a valid email"
    ),
  }),
});

const resetPasswordSchema = object({
  params: object({
    username: string({ required_error: `the field name is required` }),
    passwordResetCode: string({ required_error: `the field name is required` }),
  }),
  body: object({
    hashed_password: string({ required_error: `password is required` }).min(
      8,
      `password must be 8 characters long`
    ),
    confirm_password: string({
      required_error: `confirm_password is required`,
    }),
  }).refine((data) => data.hashed_password === data.confirm_password, {
    message: `password and confirm_password mismatch`,
    path: ["confirm_password"],
  }),
});
export default createUserSchema;

export type createUserInput = TypeOf<typeof createUserSchema>;
export type verifyUserInput = TypeOf<typeof verifyUserSchema>;
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>;
