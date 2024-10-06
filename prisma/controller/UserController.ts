import { Request, Response } from "express";
import {
  createUserService,
  findEmailService,
  findUserService,
  forgotUserService,
  passwordResetService,
  verifyUserService,
} from "../service/UserService";
import { createUserInput } from "../schema/UserSchema";
import { v4 } from "uuid";
import sendEmail from "../utils/sendEmail";

export async function CreateUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const body = req.body;
    const verification = v4();
    const user = await createUserService({
      ...body,
      verificationCode: verification,
    });
    await sendEmail({
      from: `"Jobby Recruitment Platform 👻" <lakabosch@gmail.com>`,
      to: user.email,
      subject: "Kindly verify your email ✔",
      // text: `verification code: ${user.verificationCode}. username: ${user.username}`,
      text: `click on the link http://localhost:1337/api/users/verify/${user.username}/${user.verificationCode}`,
      html: "<b>Hello world?</b>",
    });

    res.status(201).json({
      status: true,
      message: `User Successfully Created http://localhost:1337/api/users/verify/${user.username}/${user.verificationCode}`,
      // message: "User Successfully Created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function verifyUserHandler(req: Request, res: Response) {
  try {
    const { username, verificationcode } = req.params;
    const user = await findUserService(username);
    if (!user) {
      res.send("could not find user");
      return;
    }
    if (user.is_email_verified) {
      res.send("user already verified");
      return;
    }
    console;
    if (user.verificationCode === verificationcode) {
      await verifyUserService(username);

      res.status(201).send("user successfully verified");
      return;
    }
    res.status(201).json({
      status: true,
      message: "User now verified",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function forgotPasswordHandler(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await findEmailService(email);
    if (!user) {
      res.send("could not find user");
      return;
    }
    if (user.is_email_verified) {
      res.send("user already verified");
      return;
    }
    const pRC = v4();
    forgotUserService(email, {
      passwordResetCode: pRC,
    });
    await sendEmail({
      from: `"Jobby Recruitment Platform 👻" <lakabosch@gmail.com>`,
      to: user.email,
      subject: "Kindly verify your email ✔",
      // text: `verification code: ${user.verificationCode}. username: ${user.username}`,
      text: `click on the link http://localhost:1337/api/users/forgot-password/${user.username}/${pRC}`,
      html: "<b>Hello world?</b>",
    });

    // console.log
    res.status(201).json({
      status: true,
      message: `please check your email to reset password http://localhost:1337/api/users/forgot-password/${user.username}/${pRC}`,
      // message: "please check your email to reset password",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function passwordResetHandler(req: Request, res: Response) {
  try {
    const { username, passwordresetcode } = req.params;
    const { password } = req.body;
    const user = await findUserService(username);
    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordresetcode
    ) {
      res.sendStatus(400);
      return;
    }
    passwordResetService(username, {
      passwordresetcode: null,
      password: password,
    });
    res.status(201).json({
      status: true,
      message: "User Successfully Created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}
