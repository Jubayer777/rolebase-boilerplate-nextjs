import { Role } from '../auth/authSlice';

export interface Roles {
    id: number;
    title: Role;
}
export interface User {
    id: number;
    name: string;
    email: string;
    contactNo: string | null;
    profilePhotoPath?: string;
    publishedAt?: Date;
    createdAt?: Date;
    roles: Roles[];
    updatedAt?: Date;
}
