"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(
        cookies(),
        sessionOptions
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
};

export const login = async (
    prevState: { error: string } | undefined,
    formData: FormData
): Promise<{ error: string } | undefined> => {
    const session = await getSession();
    try {
        const formEmail = formData.get("email") as string;
        const formPassword = formData.get("password") as string;

        const response = await fetch(
            `${process.env.BACKEND_URI}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formEmail,
                    password: formPassword,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || "Login failed" };
        }
        const userData = await response.json();
        session.userId = userData.id;
        session.email = userData.email;
        session.auth = userData.token;
        session.isLoggedIn = true;

        await session.save();
        redirect("/");
    } catch (error) {
        return { error: "An unexpected error occurred" };
    }
};

export const logout = async () => {
    const session = await getSession();
    await session.destroy();
    redirect("/");
};

export async function registerUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const response = await fetch(
            `${process.env.BACKEND_URI}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return { error: data.message || "Registration failed" };
        }

        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "An unexpected error occurred" };
    }
}
