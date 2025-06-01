/**
 * CryptoGateway interface defines methods for cryptographic operations
 * such as hashing passwords, comparing passwords, and generating salts.
 * This interface is designed to be implemented by classes that provide
 * cryptographic functionalities, ensuring a consistent API for password management.
 */
export interface ICryptoGateway {
    /**
     * Hashes a password using a secure hashing algorithm.
     * @param password - The password to hash.
     * @returns A promise that resolves to the hashed password.
     */
    hashPassword(password: string): Promise<string>;

    /**
     * Compares a plain text password with a hashed password.
     * @param password - The plain text password to compare.
     * @param hashedPassword - The hashed password to compare against.
     * @returns A promise that resolves to true if the passwords match, false otherwise.
     */
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;

    /**
     * Generates a secure random salt.
     * @returns A promise that resolves to a string representing the salt.
     */
    generateSalt(): Promise<string>;
}