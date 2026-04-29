export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    profile_pic?: string;
    created_at: Date;
    updated_at: Date;
};