import { CreateUserData } from "src/application/types/create_user_data";
import { User } from "./user.entity";


/**
 * Factory class for creating and updating User entities.
 * Provides methods to create a new user and update an existing user.
 */
export class UserFactory {
    /**
     * Creates a new user with the provided data.
     * @param data - The data to create a new user.
     * @returns A new User instance.
     */
    static create({id, name, email, password}: CreateUserData): User {
        if (!id || !name || !email || !password) {
            throw new Error('All fields are required to create a user');
        }
        return new User(id, name, email, password);
    }

    /**
     * Updates an existing user with the provided data.
     * @param user - The user to update.
     * @param data - Partial data to update the user.
     * @returns The updated user.
     */
    static update(user: User, {name, email, password}: Partial<CreateUserData>): User {
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        return user;
    }
}