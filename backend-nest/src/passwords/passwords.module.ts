import { Module } from '@nestjs/common';
import { PasswordService } from './passwords.service';

@Module({
    imports: [
    ],
    providers: [PasswordService],
    exports: [PasswordService],
})
export class PasswordModule { }
