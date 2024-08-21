import db from "./db";
import { Elysia, t } from "elysia";

const UserModel = t.Object({
    email: t.String(),
    password: t.String(),
});

const RestaurantModel = t.Object({
    name: t.String(),
    openingTime: t.String(),
    closingTime: t.String(),
    daysOpen: t.String(),
});

const BookingModel = t.Object({
    restaurantId: t.Number(),
    userId: t.Number(),
    time: t.String(),
    total: t.Number(),
});

export { UserModel, RestaurantModel, BookingModel };
