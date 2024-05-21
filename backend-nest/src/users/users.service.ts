import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckUserDto } from './dto/check-user.dto';
import { CheckAndFetchUserDto } from './dto/check-and-fetch-user.dto';
import { PasswordService } from 'src/passwords/passwords.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly PasswordService: PasswordService
    ) { }
    async createUser(CreateUserDto: CreateUserDto): Promise<User> {
        return await this.userModel.create(CreateUserDto)
    }
    async checkUser(CheckUserDto: CheckUserDto): Promise<Boolean> {
        const user = await this.userModel.findOne({ email: CheckUserDto.email })
        return user ? true : false
    }
    async checkAndFetchUser(CheckAndFetchUserDto: CheckAndFetchUserDto): Promise<User> {
        return await this.userModel.findOne({ email: CheckAndFetchUserDto.email })
    }
    async comparePasswords(toCompare: string, original: string): Promise<boolean> {
        return await this.PasswordService.compareHash(toCompare, original);
    }
}
