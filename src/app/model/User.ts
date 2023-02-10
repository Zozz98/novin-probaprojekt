export interface User {
    uid?: string;
    name?: string;
    email?: string | null;
    password?: string;
    loginDate?: Date;
}