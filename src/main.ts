import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import { DOCS_ROUTE, swgBuilderLabels } from 'src/utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle(swgBuilderLabels.title)
    .setDescription(swgBuilderLabels.description)
    .setVersion(swgBuilderLabels.version)
    .addTag(swgBuilderLabels.tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOCS_ROUTE, app, document);

  const port = configService.get<number>('SERVER_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
