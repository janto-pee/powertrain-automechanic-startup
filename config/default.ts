import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  logLevel: process.env.LOGLEVEL,
  saltWorkFactor: Number(process.env.SALTWORKFACTOR),
  accessTokenPrivate: process.env.accessTokenPrivate,
  refreshTokenPrivate: process.env.refreshokenPrivate,
  accessTokenPublic: process.env.accessTokenPublic,
  refreshTokenPublic: process.env.refreshTokenPublic,
  smtp: {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    user: "",
    pass: "",
  },
};
