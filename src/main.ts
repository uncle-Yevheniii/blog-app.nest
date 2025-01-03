import { UserResDto, UserResDtoUnauthorized } from './users/dto';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenResDto } from './auth/dto';
import {
  BodyPostDto,
  CreatePostResDto,
  GetPostResDto,
  GetPostsResDto,
  LikeResDto,
} from './posts/dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Blog-app API')
    .setDescription('API Documentation for Blog-app project using NestJS')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'jwt' }, 'JWT-Token')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      TokenResDto,
      UserResDto,
      UserResDtoUnauthorized,
      BodyPostDto,
      CreatePostResDto,
      GetPostsResDto,
      LikeResDto,
      GetPostResDto,
    ],
  });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
