import BookingForm from "@/components/restaurant/BookingForm";
import { notFound } from "next/navigation";
import { getSession } from "@/actions";

async function getRestaurant(id: string) {
    const res = await fetch(
        `${process.env.BACKEND_URI}/restaurant/${id}`,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        return null;
    }
    return res.json().then((data) => data.data);
}

export default async function RestaurantBookingPage({
    params,
}: {
    params: { id: string };
}) {
    const restaurant = await getRestaurant(params.id);
    if (!restaurant) {
        notFound();
    }
    const session = await getSession();
    if (!session || !session.userId || !session.auth) {
        return notFound();
    }

    return (
        <div>
            <BookingForm
                userId={session.userId}
                restaurant={restaurant}
                auth={session.auth}
            />
        </div>
    );
}
