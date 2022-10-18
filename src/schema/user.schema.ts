import { Omit } from "lodash";
import { object, string, TypeOf } from "zod";

const createUserSchema = object({
  body: object({
    name: string({ required_error: `the field name is required` }),
    password: string({ required_error: `password is required` }).min(
      8,
      `password must be 8 characters long`
    ),
    email: string({ required_error: `email is required` }).email(
      "must be a valid email"
    ),
    confirm_password: string({
      required_error: `confirm_password is required`,
    }),
  }).refine((data) => data.password === data.confirm_password, {
    message: `password and confirm_password mismatch`,
    path: ["confirm_password"],
  }),
});

export default createUserSchema;

export type createUserInput = TypeOf<typeof createUserSchema>;
