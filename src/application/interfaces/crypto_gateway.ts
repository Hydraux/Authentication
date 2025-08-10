/**
 * CryptoGateway interface defines methods for cryptographic operations
 * such as hashing passwords, comparing passwords, and generating salts.
 * This interface is designed to be implemented by classes that provide
 * cryptographic functionalities, ensuring a consistent API for password management.
 */
export interface ICryptoGateway {
  /**
   * Hashes a string using a secure hashing algorithm.
   * @param value - The string to hash.
   * @returns A promise that resolves to the hashed string.
   */
  hash(value: string): Promise<string>;

  /**
   * Compares a plain text password with a hashed password.
   * @param value - The plain text password to compare.
   * @param hashedValue - The hashed password to compare against.
   * @returns A promise that resolves to true if the passwords match, false otherwise.
   */
  validate(value: string, hashedValue: string): Promise<boolean>;

  /**
   * Generates a secure random salt.
   * @returns A promise that resolves to a string representing the salt.
   */
  generateSalt(): Promise<string>;
}
