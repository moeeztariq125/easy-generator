export class SignInDto {
    email: string
    password: string
}

export class SignInReponse {
    message: string;
    data: {
        firstName: string;
        lastName: string;
        userID: string;
        accessToken: string;
        refreshToken: string;
    }
}
export class SignInRedirectionReponse {
    message: string;
    redirectTo: 'SIGNIN' | 'SIGNUP'
}