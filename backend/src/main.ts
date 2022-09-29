import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as passport from 'passport';
import { createDatabase } from 'typeorm-extension';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import otelSDK from './tracing';
import { Session } from './typeorm/entities/Session';



async function bootstrap() {
  // Start SDK before nestjs factory create
  await otelSDK.start();
  await createDatabase({ ifNotExist: true });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });


  app.use(helmet());
  app.enableCors({ origin: 'http://localhost:8080', credentials: true });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  const PORT = process.env.PORT || 5555;
  const sessionRepository = app
    .get(AppModule)
    .getDataSource()
    .getRepository(Session);

  app.use(
    session({
      secret: 'lhasdklashjdkasdhja12po893hsjnxc',
      saveUninitialized: false,
      resave: false,
      cookie: {
        path: '/',
        secure: process.env.ENVIRONMENT === 'PRODUCTION' ? true : true,
        httpOnly: true,
        maxAge: 360000,
        sameSite: 'strict'
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());


  const config = new DocumentBuilder()
    .setTitle('Pet Hero')
    .setDescription('Pet Hero API')
    .setVersion('1.0')
    .addTag('PetHero')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
}
bootstrap();
