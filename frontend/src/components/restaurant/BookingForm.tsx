"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

function formatDaysOpen(daysOpen: string) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const openDays = daysOpen.split(",").map(Number);

    let ranges = [];
    let start = openDays[0];
    let prev = start;

    for (let i = 1; i <= openDays.length; i++) {
        if (i === openDays.length || openDays[i] !== prev + 1) {
            ranges.push(
                start === prev ? days[start] : `${days[start]}-${days[prev]}`
            );
            start = openDays[i];
        }
        prev = openDays[i];
    }

    return ranges.join(", ");
}

export default function BookingForm({
    userId,
    restaurant,
    auth,
}: {
    userId: string;
    restaurant: {
        id: number;
        name: string;
        daysOpen: string;
        openingTime: string;
        closingTime: string;
    };
    auth: string;
}) {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(undefined);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const bookingData = {
            restaurantId: Number(formData.get("restaurantId")),
            userId: Number(formData.get("userId")),
            time: formData.get("time") as string,
            total: Number(formData.get("total")),
        };
        
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URI}/booking`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(bookingData),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create booking");
            }
            router.push("/bookings");
        } catch (error : any) {
            console.error("Error creating booking:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>{restaurant.name} - Make a Reservation</CardHeader>
            <CardContent className="space-y-4">
                <p>
                    Open: {formatDaysOpen(restaurant.daysOpen)}
                    <br />
                    {restaurant.openingTime}-{restaurant.closingTime}{" "}
                </p>
                <form onSubmit={handleSubmit} className="space-y-1">
                    <input
                        type="hidden"
                        name="restaurantId"
                        value={restaurant.id}
                    />
                    <input type="hidden" name="userId" value={userId} />
                    <Input type="datetime-local" name="time" required />
                    <Input
                        type="number"
                        name="total"
                        placeholder="Number of guests"
                        min="1"
                        defaultValue="1"
                        required
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Booking..." : "Book"}
                    </Button>
                </form>
                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
