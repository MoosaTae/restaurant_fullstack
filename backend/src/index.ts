import { Elysia, t } from "elysia";
import { createUser, getUser, verifyUser } from "./controllers/user";
import {
    getRestaurants,
    getRestaurant,
    createRestaurant,
} from "./controllers/restaurant";
import {
    getBooking,
    getBookings,
    createBooking,
    deleteBooking,
} from "./controllers/booking";
import { UserModel, RestaurantModel, BookingModel } from "./model";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

const app = new Elysia();

app.use(
    jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
    })
);
app.derive(async ({ jwt, cookie: { auth } }) => {
    const profile = await verifyUser(jwt, auth);
    return { profile };
});
app.use(swagger());
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3001', 'http://localhost:3000'],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.post(
    "/register",
    async ({ body, set }) => {
        try {
            let userData: any = body;
            userData.password = await Bun.password.hash(userData.password, {
                algorithm: "bcrypt",
                cost: 4,
            });
            createUser(userData);
            return { message: "User registered successfully", data: userData };
        } catch (error) {
            set.status = 400;
            return { message: "Failed to register user", error: error.message };
        }
    },
    {
        body: UserModel,
    }
);
app.post(
    "/login",
    async ({ body, set, jwt, cookie: { auth } }) => {
        try {
            let userData: any = body;
            const response: any = await getUser(userData);
            if (!response.loggedIn) {
                set.status = 400;
                return { message: "Invalid email or password" };
            }
            delete userData.password;
            auth.set({
                value: await jwt.sign(response.data),
                httpOnly: true,
                maxAge: 7 * 86400,
            });

            return {
                message: "User registered successfully",
                token: auth.value,
                id: response.data.id,
                email: response.data.email,
            };
        } catch (error) {
            set.status = 400;
            return { message: "Failed to login", error: error.message };
        }
    },
    {
        body: UserModel,
    }
);

app.get("/profile", async ({ profile, set }) => {
    try {
        if (!profile || !profile.authorized) {
            set.status = 401;
            return { message: "Unauthorized" };
        }
        return { message: "User profile", data: profile.data };
    } catch (error) {
        set.status = 401;
        return { message: "Unauthorized", error: error.message };
    }
});

app.get("/restaurants", async ({ set }) => {
    try {
        const restaurants = getRestaurants();
        return { data: restaurants };
    } catch (error) {
        set.status = 400;
        return { message: "Failed to fetch restaurants", error: error.message };
    }
});

app.get("/restaurant/:id", async ({ params, set }) => {
    try {
        const restaurant = getRestaurant(parseInt(params.id));
        return { data: restaurant };
    } catch (error) {
        set.status = 400;
        return { message: "Failed to fetch restaurant", error: error.message };
    }
});

app.post(
    "/restaurant",
    async ({ body, set }) => {
        try {
            const restaurant = createRestaurant(body);
            return {
                message: "Restaurant created successfully",
                data: restaurant,
            };
        } catch (error) {
            set.status = 400;
            return {
                message: "Failed to create restaurant",
                error: error.message,
            };
        }
    },
    {
        body: RestaurantModel,
    }
);

app.guard(
    {
        beforeHandle({ set, profile }) {
            if (!profile || !profile.authorized) {
                set.status = 401;
                return { message: "Unauthorized" };
            }
        },
    },
    (app) => {
        app.get("/booking/:id", async ({ params, set, profile }) => {
            try {
                const booking = getBooking(
                    parseInt(params.id),
                    profile.data.id
                );
                if (!booking.authorized) {
                    set.status = 401;
                    return { message: "Unauthorized" };
                }
                return { data: booking.data };
            } catch (error) {
                set.status = 400;
                return {
                    message: "Failed to fetch booking",
                    error: error.message,
                };
            }
        });
        app.post(
            "/booking",
            async ({ body, set }) => {
                try {
                    const booking = createBooking(body);
                    if (!booking.success) {
                        throw new Error(booking.message);
                    }
                    return {
                        message: "Booking created successfully",
                        data: booking,
                    };
                } catch (error) {
                    set.status = 400;
                    return {
                        message: "Failed to create booking",
                        error: error.message,
                    };
                }
            },
            { body: BookingModel }
        );

        app.delete("/booking/:id", async ({ params, set }) => {
            try {
                const booking = deleteBooking(parseInt(params.id));
                if (!booking.success) {
                    throw new Error(booking.message);
                }
                return {
                    message: "Booking deleted successfully",
                    data: booking,
                };
            } catch (error) {
                set.status = 400;
                return {
                    message: "Failed to delete booking",
                    error: error.message,
                };
            }
        });
        return app;
    }
);
app.get("/bookings", async ({ set }) => {
    try {
        const bookings = getBookings();
        return { data: bookings };
    } catch (error) {
        set.status = 400;
        return { message: "Failed to fetch bookings", error: error.message };
    }
});

app.listen(3000);
console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
