interface ICheckUser {
  message: string;
  redirectTo: 'SIGNIN' | 'SIGNUP';
}

interface ISignUpRequest {
  email: string;
  password: string;
  dob: string;
  firstName: string;
  lastName: string;
}

interface ISignUpResponse {
  message: string;
  redirectTo?: 'SIGNIN' | 'SIGNUP';
  data: {
    firstName: string;
    lastName: string;
    userID: string;
  };
}

interface ISignInRequest {
  email: string;
  password: string;
}

interface ISignInResponse {
  message: string;
  redirectTo?: 'SIGNIN' | 'SIGNUP';
  data: {
    firstName: string;
    lastName: string;
    userID: string;
    accessToken: string;
    refreshToken: string;
  };
}

export {
  type ICheckUser,
  type ISignUpRequest,
  type ISignUpResponse,
  type ISignInRequest,
  type ISignInResponse,
};
