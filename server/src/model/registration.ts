export interface RegistrationRequest {
    username: string
    email: string
    password: string
}

export interface Registration {
    username: string
    email: string
    password: string
    create_time: Date
    token: string
}
