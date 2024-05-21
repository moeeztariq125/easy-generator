import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtUtilityService } from './jwt-utility/jwt-utility.service';
import { JwtUtilityModule } from './jwt-utility/jwt-utility.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordModule } from './passwords/passwords.module';
import { PasswordService } from './passwords/passwords.service';

@Module({
  imports: [DatabaseModule, UsersModule, ConfigModule.forRoot({ isGlobal: true }), JwtUtilityModule, JwtModule.register({}), PasswordModule],
  controllers: [AppController, UsersController],
  providers: [AppService, ConfigService, JwtUtilityService, PasswordService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
