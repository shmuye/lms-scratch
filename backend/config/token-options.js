export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  // secure: false,
  secure: true,
  // sameSite: "lax",
  sameSite: "none",
  maxAge: 1000 * 60 * 15, // 5 minutes,
};

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  // sameSite: "lax",
  // secure: false,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000, // 3 days
};
