import BookingsList from "@/components/booking/BookingsList";
import { getSession } from "@/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SessionData } from "@/lib";

async function getBookings(user_id: string, auth: string) {
    const res = await fetch(
        `${process.env.BACKEND_URI}/booking/${user_id}`,
        {
            headers: {
                Cookie: `auth=${auth}`,
            },
        }
    );
    console.log("status", res.status);
    if (!res.ok) {
        console.error("Failed to fetch bookings");
        return null;
    }

    return res.json();
}

export default async function BookingsPage() {
    const session: SessionData = await getSession();
    if (!session || !session.isLoggedIn || !session.userId  || !session.auth) {
        return (
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Please Login first</AlertTitle>
                <AlertDescription>
                    You need to login to view your bookings.
                </AlertDescription>
                <Button>
                    <Link href="/login">Login here</Link>
                </Button>
            </Alert>
        );
    }

    const bookings = await getBookings(session.userId, session.auth);

    if (!bookings) {
        return <p>Failed to fetch bookings</p>;
    }
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-5">My Bookings</h1>
            {bookings.data.length === 0 ? (
                <p>You do not have any bookings yet.</p>
            ) : (
                <BookingsList initialBookings={bookings.data} />
            )}
        </div>
    );
}
