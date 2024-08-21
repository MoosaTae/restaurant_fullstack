"use client";

import { login } from "@/actions";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <Card className="w-[350px]">
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Your email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Your password" required />
            </div>
          </div>
          {state?.error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;