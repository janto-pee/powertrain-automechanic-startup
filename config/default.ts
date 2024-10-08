// export default {
//   port: 1337,
//   logLevel: "info",
//   saltWorkFactor: 10,
//   accessTokenTtl: "15m",
//   refreshTokenTtl: "1y",
//   smtp: {
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//     user: "",
//     pass: "",
//   },
// };

import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  logLevel: process.env.LOGLEVEL,
  saltWorkFactor: Number(process.env.SALTWORKFACTOR),
  accessTokenPrivate: process.env.ACCESS_TOKEN_PRIVATE,
  refreshTokenPrivate: process.env.REFRESH_TOKEN_PRIVATE,
  accessTokenPublic: process.env.ACCESS_TOKEN_PUBLIC,
  refreshTokenPublic: process.env.REFRESH_TOKEN_PUBLIC,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  smtp: {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    user: process.env.CRED_USER,
    pass: process.env.CRED_PASS,
  },
  cred: {
    user: process.env.CRED_USER,
    pass: process.env.CRED_PASS,
    smtp: { host: "smtp.ethereal.email", port: 587, secure: false },
    imap: { host: "imap.ethereal.email", port: 993, secure: true },
    pop3: { host: "pop3.ethereal.email", port: 995, secure: true },
    web: "https://ethereal.email",
    mxEnabled: false,
  },
};
