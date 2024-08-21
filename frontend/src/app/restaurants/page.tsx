import RestaurantList from "@/components/restaurant/RestaurantList";

async function getRestaurants() {
    const res = await fetch(
        `${process.env.BACKEND_URI}/restaurants`
    );
    if (!res.ok) {
        throw new Error("Failed to fetch restaurants");
    }
    return res.json();
}

export default async function RestaurantsPage() {
    const restaurants = await getRestaurants();
    return <RestaurantList restaurants={restaurants.data} />;
}
