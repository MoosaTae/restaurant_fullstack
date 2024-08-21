"use client";

import { logout } from "@/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LogoutForm() {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/"); // Redirect to home page after logout
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}
                    className="flex justify-center"
                >
                    <Button type="submit" variant="destructive">
                        Logout
                    </Button>
                </form>
            </CardHeader>
        </Card>
    );
}
