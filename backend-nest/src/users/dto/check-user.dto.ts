export class CheckUserDto {
    email: string
}

export class CheckUserResponse {
    message: string;
    redirectTo: 'SIGNIN' | 'SIGNUP'
}