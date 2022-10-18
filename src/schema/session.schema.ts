import { object, string, TypeOf } from "zod";

const createSessionSchema = object({
  body: object({
    password: string({ required_error: `password is required` }).min(
      8,
      `password must be 8 characters long`
    ),
    email: string({ required_error: `email is required` }).email(
      "must be a valid email"
    ),
  }),
});

export default createSessionSchema;

export type createUserInput = TypeOf<typeof createSessionSchema>;
