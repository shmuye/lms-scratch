export const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15 // 15 minutes,

};

export const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

};