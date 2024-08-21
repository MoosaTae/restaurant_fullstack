import { SessionOptions } from "iron-session";

export interface SessionData {
    userId?: string;
    email?: string;
    img?: string;
    auth?: string;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: process.env.AUTH_SECRET!,
    cookieName: "session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    },
};
