export class CreateUserDto {
    firstName: string
    lastName: string
    email: string
    userID?: string
    password: string
    dob: Date
}

export class CreateUserRedirectResponse {
    message: string;
    redirectTo: 'SIGNUP' | 'SIGNIN'
}