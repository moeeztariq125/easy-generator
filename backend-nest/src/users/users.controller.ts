import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserRedirectResponse } from './dto/create-user.dto';
import { User } from './schema/users.schema';
import { CheckUserDto, CheckUserResponse } from './dto/check-user.dto';
import { SignInDto, SignInRedirectionReponse, SignInReponse } from './dto/signin.dto';
import { JwtUtilityService } from 'src/jwt-utility/jwt-utility.service';
import { PasswordService } from 'src/passwords/passwords.service';

@Controller('api/users')
export class UsersController {
    constructor(
        private readonly UsersService: UsersService,
        private readonly JwtUtilityService: JwtUtilityService,
        private readonly PasswordService: PasswordService
    ) { }

    @Post('check')
    async checkUser(@Body() CheckUserDto: CheckUserDto): Promise<CheckUserResponse> {
        const check = await this.UsersService.checkUser(CheckUserDto)
        if (check) {
            return ({
                message: 'OK|SUCCESS',
                redirectTo: 'SIGNIN',
            });
        }
        return ({
            message: 'OK|SUCCESS',
            redirectTo: 'SIGNUP',
        });
    }
    @Post('sign-up')
    async signUp(@Body() CreateUserDto: CreateUserDto): Promise<Partial<User> | CreateUserRedirectResponse> {
        const exists = await this.UsersService.checkUser({ email: CreateUserDto.email })
        if (exists) {
            return {
                message: 'OK|SUCCESS',
                redirectTo: 'SIGNIN',
            }
        }
        const userCreationObj = {
            email: String(CreateUserDto.email),
            firstName: String(CreateUserDto.firstName),
            lastName: String(CreateUserDto.lastName),
            dob: new Date(CreateUserDto.dob),
            password: await this.PasswordService.hashPassword(String(CreateUserDto.password)),
        };
        const user = await this.UsersService.createUser(userCreationObj)
        return {
            firstName: user?.firstName,
            lastName: user?.lastName,
            userID: user?.userID,
            email: user?.email,
            dob: user?.dob
        }
    }
    @Post('sign-in')
    async signIn(@Body() SignInDto: SignInDto): Promise<SignInReponse | SignInRedirectionReponse> {
        const user = await this.UsersService.checkAndFetchUser({ email: SignInDto.email })
        if (!user) {
            return {
                message: 'OK|SUCCESS',
                redirectTo: 'SIGNUP',
            }
        }
        const match = await this.UsersService.comparePasswords(SignInDto.password, user.password ?? '');
        if (!match) {
            throw new BadRequestException({ errors: [{ message: 'Wrong Password' }] });
        }
        const tokens = this.JwtUtilityService.generateToken(user.userID);
        return {
            message: 'OK|SUCCESS',
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                userID: user.userID,
                ...tokens,
            },
        }
    }
}
