import db from "../db";

const TABLE_NAME = "restaurants";

const getRestaurants = () => {
    try {
        const query = db.query(`select * from ${TABLE_NAME};`);
        return query.all();
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getRestaurant = (id: number) => {
    try {
        const query = db.query(`select * from ${TABLE_NAME} where id=$id;`);
        return query.get({
            $id: id,
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};

const createRestaurant = (restaurant: any) => {
    try {
        const query = db.query(`
            INSERT INTO ${TABLE_NAME}
            ("name", "openingTime", "closingTime", "daysOpen")
            VALUES ($name, $openingTime, $closingTime, $daysOpen);`);
        return query.run({
            $name: restaurant.name,
            $openingTime: restaurant.openingTime,
            $closingTime: restaurant.closingTime,
            $daysOpen: restaurant.daysOpen,
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { getRestaurants, getRestaurant, createRestaurant };
