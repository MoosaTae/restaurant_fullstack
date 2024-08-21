import db from "../db";

const TABLE_NAME = "booking";
const TABLE_NAME_RESTAURANTS = "restaurants";

const getBookings = () => {
    try {
        const query = db.query(`select * from ${TABLE_NAME};`);
        return query.all();
    } catch (error) {
        return [];
    }
};

const getBooking = (id: number, profileId: number) => {
    try {
        if (id !== profileId) {
            throw new Error("Unauthorized to view booking");
        }
        const query =
            db.query(`SELECT b.*, r.name as restaurant_name, r.id as restaurant_id
            FROM ${TABLE_NAME} b
            JOIN ${TABLE_NAME_RESTAURANTS} r ON b.restaurantId = r.id
            WHERE b.userId = $id;
            `);
        const data = query.all({
            $id: id,
        });
        return { data, authorized: true };
    } catch (error) {
        return { message: error.message, authorized: false };
    }
};

const createBooking = (booking: any) => {
    function isOutsideOpeningHours(
        booking: { time: string },
        restaurant: { openingTime: string; closingTime: string }
    ): boolean {
        const parseTimeBooking = (timeString: string): number => {
            const [hours, minutes] = timeString.split(":").map(Number);
            return hours * 60 + minutes;
        };
        const parseTimeRestaurant = (timeString: string): number => {
            const [hours, minutes] = timeString.split(".").map(Number);
            return hours * 60 + minutes;
        };

        const openingMinutes = parseTimeRestaurant(restaurant.openingTime);
        const closingMinutes = parseTimeRestaurant(restaurant.closingTime);
        // A : "2021-08-01T12:00:00"
        const bookingMinutes = parseTimeBooking(booking.time.split("T")[1]);
        if (closingMinutes > openingMinutes) {
            return (
                bookingMinutes < openingMinutes ||
                bookingMinutes >= closingMinutes
            );
        } else {
            return (
                bookingMinutes < openingMinutes &&
                bookingMinutes >= closingMinutes
            );
        }
    }

    try {
        const restaurantQuery = db.query(
            `select * from restaurants where id=$restaurantId;`
        );
        const restaurant: any = restaurantQuery.get({
            $restaurantId: booking.restaurantId,
        });
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }
        const userQuery = db.query(`select * from users where id=$userId;`);
        const user: any = userQuery.get({
            $userId: booking.userId,
        });
        if (!user) {
            throw new Error("User not found");
        }

        if (isOutsideOpeningHours(booking, restaurant)) {
            throw new Error(
                "Booking time is outside of restaurant opening hours"
            );
        }

        // check days open
        const daysOpen = restaurant.daysOpen.split(",");
        const bookingDate = new Date(booking.time);
        if (!daysOpen.includes(bookingDate.getDay().toString())) {
            throw new Error("Restaurant closed on this day");
        }

        const query = db.query(`
            INSERT INTO "${TABLE_NAME}"
            ("restaurantId", "userId", "time", "total")
            VALUES ($restaurantId, $userId, $time, $total);`);
        const response = query.run({
            $restaurantId: booking.restaurantId,
            $userId: booking.userId,
            $time: booking.time,
            $total: booking.total,
        });
        return {
            success: true,
            message: "Booking created successfully",
            data: response,
        };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};

const deleteBooking = (id: number) => {
    try {
        const bookingQuery = db.query(
            `select * from ${TABLE_NAME} where id=$id;`
        );
        const booking: any = bookingQuery.get({
            $id: id,
        });
        if (!booking) {
            throw new Error("Booking not found");
        }
        const userQuery = db.query(`select * from users where id=$userId;`);
        const user: any = userQuery.get({
            $userId: booking.userId,
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.id !== booking.userId) {
            throw new Error("Unauthorized to delete booking");
        }

        const query = db.query(`DELETE from ${TABLE_NAME} where id=$id;`);
        const response = query.run({
            $id: id,
        });
        return {
            success: true,
            message: "Booking deleted successfully",
            data: response,
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export { getBookings, getBooking, createBooking, deleteBooking };
