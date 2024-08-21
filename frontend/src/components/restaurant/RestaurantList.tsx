"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Restaurant = {
    id: string;
    name: string;
    daysOpen: string;
    openingTime: string;
    closingTime: string;
};

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

export default function RestaurantList({
    restaurants,
}: {
    restaurants: Restaurant[];
}) {
    if (!restaurants) {
        return <p>Loading...</p>;
    }
    return (
        <Card>
            <CardHeader>Restaurants</CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Opening Days</TableHead>
                            <TableHead>Operating Hours</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {restaurants.map((restaurant: Restaurant) => (
                            <TableRow key={restaurant.id}>
                                <TableCell>{restaurant.name}</TableCell>
                                <TableCell>
                                    {formatDaysOpen(restaurant.daysOpen)}
                                </TableCell>
                                <TableCell>
                                    {restaurant.openingTime}-
                                    {restaurant.closingTime}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/restaurants/${restaurant.id}`}
                                    >
                                        <Button>Book</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
