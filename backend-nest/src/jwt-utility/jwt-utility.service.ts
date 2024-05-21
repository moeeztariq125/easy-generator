import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilityService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    generateToken(userID: string): { accessToken: string; refreshToken: string } {
        const access_secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
        const refresh_secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');

        return {
            accessToken: this.jwtService.sign({ id: userID }, { secret: access_secret, expiresIn: '5m', }),
            refreshToken: this.jwtService.sign({ id: userID }, { secret: refresh_secret, expiresIn: '1h' }),
        }
    }

    verifyAccessToken(token: string): any {
        const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
        return this.jwtService.verify(token, { secret });
    }
    verifyRefreshToken(token: string): any {
        const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
        return this.jwtService.verify(token, { secret });
    }
}
