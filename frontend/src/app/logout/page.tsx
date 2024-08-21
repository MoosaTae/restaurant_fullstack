import { getSession } from "@/actions";
import LogoutForm from "@/components/LogoutForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const LogoutPage = async () => {
    const session = await getSession();

    return (
        <div className="flex items-center justify-center">
            {session.isLoggedIn ? (
                <LogoutForm />
            ) : (
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Not Logged In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You are not currently logged in.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default LogoutPage;