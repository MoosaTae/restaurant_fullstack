"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Booking = {
    id: number;
    restaurant_name: string;
    time: string;
    total: number;
};

export default function BookingsList({ initialBookings = [] }) {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [restaurantFilter, setRestaurantFilter] = useState("");

    const handleCancel = async (id: number) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URI}/booking/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to cancel booking");
            }
            setBookings(bookings.filter((booking) => booking.id !== id));
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        const restaurantMatch = booking.restaurant_name
            .toLowerCase()
            .includes(restaurantFilter.toLowerCase());
        return restaurantMatch;
    });

    if (!bookings || bookings.length === 0) {
        return <div>No bookings found.</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reservation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 mb-4">
                    <Input
                        placeholder="Filter by restaurant"
                        value={restaurantFilter}
                        onChange={(e) => setRestaurantFilter(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Restaurant</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Guests</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.restaurant_name}</TableCell>
                                <TableCell>
                                    {new Date(booking.time).toLocaleString()}
                                </TableCell>
                                <TableCell>{booking.total}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleCancel(booking.id)}
                                    >
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
