export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean; // Optional, defaults to false
}