export interface RegistrationRequest {
    username: string
    email: string
    password: string
    name: string
    surname: string
    birthdate: string
}

export interface Registration {
    username: string
    email: string
    password: string
    name: string
    surname: string
    birthdate: Date
    create_time: Date
    token: string
}
