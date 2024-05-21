import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppLogger } from 'src/utils/logger';

@Injectable()
export class PasswordService {
    saltRounds = 10;
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }
    async compareHash(password: string, toCompare: string): Promise<boolean> {
        try {
            const match = await bcrypt.compare(password, toCompare)
            return match
        } catch (err: any) {
            AppLogger.error('Error while trying to compare passwords: ', err);
            throw new Error('Something Went Wrong');
        }
    };
}
