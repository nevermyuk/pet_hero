import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
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

declare module 'express-session' {
  interface SessionData {
    isSecondFactorAuthenticated: boolean;
  }
}



async function bootstrap() {
  // Start SDK before nestjs factory create
  await otelSDK.start();
  await createDatabase({ ifNotExist: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });


  app.use(helmet());

  const corsOptions = {
    origin: [process.env.FRONT_APP_URL],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
  }

  app.enableCors(corsOptions);
  app.set('trust proxy', 1)

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();

  app.useGlobalInterceptors(new LoggerErrorInterceptor(), new ClassSerializerInterceptor(
    app.get(Reflector)));
  // whitelist remove any query/body/param that is not part of dto
  // transform query of request
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  const PORT = process.env.PORT || 5555;
  const sessionRepository = app
    .get(AppModule)
    .getDataSource()
    .getRepository(Session);

  sessionStore = new TypeormStore({
    cleanupLimit: 2,
  }).connect(sessionRepository)

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      proxy: true,
      saveUninitialized: false,
      resave: false,
      cookie: {
        path: '/',
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict'
      },
      store: sessionStore
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());


  if (process.env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle('Pet Hero')
      .setDescription('Pet Hero API')
      .setVersion('1.0')
      .addTag('PetHero')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
}

export let sessionStore: TypeormStore;

bootstrap();
