import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtUtilityService } from './jwt-utility.service';

@Module({
    imports: [
        ConfigModule,
        JwtModule.register({}),
    ],
    providers: [JwtUtilityService],
    exports: [JwtUtilityService],
})
export class JwtUtilityModule { }
