import { ICryptoGateway } from "src/application/interfaces/crypto_gateway";

/**
 * BcryptCryptoGateway implements the ICryptoGateway interface using bcrypt for password hashing and comparison.
 * It provides methods to hash passwords, compare passwords, and generate salts.
 * This class is designed to be used in applications that require secure password management.
 */
export class BcryptCryptoGateway implements ICryptoGateway {
    private bcrypt = require('bcrypt');

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await this.bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await this.bcrypt.compare(password, hashedPassword);
    }

    async generateSalt(): Promise<string> {
        const saltRounds = 10;
        return await this.bcrypt.genSalt(saltRounds);
    }
}