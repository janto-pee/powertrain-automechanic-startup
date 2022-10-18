import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  privateKey: "accessTokenPrivate" | "refreshTokenPrivate",
  options?: jwt.SignOptions | undefined
) {
  try {
    const signInKey = config.get<string>(privateKey);
    return jwt.sign(object, signInKey, {
      ...(options && options),
      algorithm: "RS256",
    });
  } catch (error) {
    return error;
  }
}
export function verifyJwt(
  token: string,
  publicKey: "accessTokenPublic" | "refreshTokenPublic"
) {
  try {
    const signInKey = config.get<string>(publicKey);
    const decoded = jwt.verify(token, signInKey);

    return { valid: true, decoded, expired: false };
  } catch (error: any) {
    return {
      valid: false,
      decoded: null,
      expired: error.message == error.message,
    };
  }
}
