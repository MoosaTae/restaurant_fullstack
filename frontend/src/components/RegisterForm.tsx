"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerUser } from "@/actions";

const initialState = {
    error: "",
    success: undefined,
};

const RegisterForm = () => {
    const [state, formAction] = useFormState(registerUser, initialState);
    const router = useRouter();

    if (state.success) {
        router.push("/login");
        return null;
    }

    return (
        <Card className="w-[350px]">
            <form action={formAction}>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Create a new account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Your email"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Choose a password"
                                required
                            />
                        </div>
                    </div>
                    {state.error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default RegisterForm;
