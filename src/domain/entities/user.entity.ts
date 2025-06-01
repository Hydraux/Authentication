
/**
 * Represents a user in the system with properties for id, name, email, and password.
 * Provides getters and setters for these properties.
 * @param {id} - Unique identifier for the user.
 * @param {name} - Name of the user.
 * @param {email} - Email address of the user.
 * @param {password} - Password for the user account.
 */
export class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;

    constructor(id: string, name: string, email: string, password: string) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
    }
    get id(): string {
        return this._id;
    }
   
    get name(): string {
        return this._name;
    }
   
    get email(): string {
        return this._email;
    }
   
    get password(): string {
        return this._password;
    }
   
    set name(name: string) {
        this._name = name;
    }
   
    set email(email: string) {
        this._email = email;
    }
   
    set password(password: string) {
        this._password = password;
    }
}