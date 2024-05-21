# Easy Generator Assignment

## Running the Backend
### To run the backend, follow these steps:
 ```
 cd backend-nest
 docker compose -f mongo-compose.yml -d
 npm i
 npm run start:dev
 ```
   
## Running the Frontend
### To run the backend, follow these steps:
```
 cd frontend
 npm i
 npm run dev
 ```
## Endpoints
### There are three endpoints available.
1. /check - Used to check if a user exists in the system and redirect to the correct part of the app.
2. /sign-up - Used to create a user.
3. /sign-in - Used to login a user and provide access tokens.

## Security Features
### Implemented Security Features:
1. Passwords are hashed and compared using hashes for enhanced security.
2. JSON Web Tokens (JWT) are assigned with different secret keys for access and refresh tokens.
3. JWKS (JSON Web Key Set) is not used in this implementation.
4. Logging is implemented on the backend using Winston, with custom wrappers to help with masking custom keys for security purposes.

##Feedback
### I welcome feedback and suggestions for improvement.
There is room for improvements in this template. I welcome any feedback or suggestions for enhancement.
