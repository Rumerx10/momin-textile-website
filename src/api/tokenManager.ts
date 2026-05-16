import jwt, {JwtPayload} from "jsonwebtoken";
import {getCookie, setCookie, deleteCookie} from "cookies-next";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const getDecodedAccessToken = <
  T extends JwtPayload = JwtPayload
>(): T | null => {
  const token = getAccessToken();

  if (!token) return null;

  try {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string") return null;

    return decoded as T;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwt.decode(token) as JwtPayload;
  try {
    if (!decodedToken || !decodedToken.exp) return true;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000) + 60; // buffer 60s
    return decodedToken.exp < currentTimeInSeconds;
  } catch {
    return true;
  }
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  setCookie(ACCESS_TOKEN_KEY, accessToken, {path: "/"});
  setCookie(REFRESH_TOKEN_KEY, refreshToken, {path: "/"});
};

// Get access token
export const getAccessToken = (): string | undefined => {
  return getCookie(ACCESS_TOKEN_KEY) as string | undefined;
};

// Get refresh token
export const getRefreshToken = (): string | undefined => {
  return getCookie(REFRESH_TOKEN_KEY) as string | undefined;
};

// Clear tokens
export const clearTokens = () => {
  deleteCookie(ACCESS_TOKEN_KEY, {path: "/"});
  deleteCookie(REFRESH_TOKEN_KEY, {path: "/"});
};
