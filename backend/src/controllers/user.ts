import db from "../db";

const createUser = (user: any) => {
    try {
        const query = db.query(`
            INSERT INTO "users"
            ("email", "password")
            VALUES ($email, $password);`);
        query.run({
            $email: user.email,
            $password: user.password,
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getUser = async (user: any) => {
    try {
        const query = db.query(`select * from users where email=$email;`);
        const userData: any = query.get({
            $email: user.email,
        });
        if (!userData) {
            throw new Error("User not found");
        }
        const isMatch = await Bun.password.verify(
            user.password,
            userData.password
        );
        delete userData.password;
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        return { loggedIn: true, data: userData };
    } catch (error) {
        console.log(error);
        return [];
    }
};

const verifyUser = async (jwt, auth) => {
    try {
        const profile = await jwt.verify(auth.value);
        if (!profile) {
            return { authorized: false };
        }
        return { authorized: true, data: profile };
    }
    catch (error) {
        console.log(error);
        return { authorized: false };
    }
};


export { createUser, getUser, verifyUser };
