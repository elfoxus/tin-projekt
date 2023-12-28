export interface AuthRequest {
    username: string
    password: string
}

export interface User {
    username: string,
    role: string
}

export interface UserActivationData {
    email: string,
    password: string,
    role: 'USER',
    username: string,
    activate_time: Date
}