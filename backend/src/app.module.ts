import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { OpenTelemetryModule } from 'nestjs-otel';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { roles } from './auth/user-roles';
import { Interest } from './interest/entities/interest.entity';
import { InterestModule } from './interest/interest.module';
import { LoggerModule } from './logger/logger.module';
import { MediaModule } from './media/media.module';
import { Pet } from './pet/entities/pet.entity';
import { PetModule } from './pet/pet.module';
import { Profile } from './profile/entities/profile.entity';
import { ProfileModule } from './profile/profile.module';
import { StorageModule } from './storage/storage.module';
import { Session } from './typeorm/entities/Session';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';


const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
    },
  },
});



@Module({
  imports: [
    OpenTelemetryModuleConfig,
    LoggerModule,
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: (logger: PinoLogger): TypeOrmModuleOptions => {
        logger.setContext('DbModule');
        return {
          type: process.env.PG_DB_TYPE as 'postgres',
          host: process.env.PG_DB_HOST,
          port: Number.parseInt(process.env.PG_DB_PORT),
          username: process.env.PG_DB_USER,
          password: process.env.PG_DB_PASS,
          database: process.env.PG_DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
          entities: [User, Session, Profile, Pet, Interest],
          // logger: new PinoTypeOrmLogger(logger),
        };
      },
      inject: [PinoLogger],
    }),
    PassportModule.register({ session: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    AccessControlModule.forRoles(roles),
    UsersModule,
    ProfileModule,
    PetModule,
    StorageModule,
    MediaModule,
    InterestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
  getDataSource() {
    return this.dataSource;
  }
}
