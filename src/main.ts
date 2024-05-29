import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { swgBuilderLabels } from 'src/utils/generalConstants';
import { ERouteNames } from 'src/entities/enums/route-names.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(swgBuilderLabels.title)
    .setDescription(swgBuilderLabels.description)
    .setVersion(swgBuilderLabels.version)
    .addTag(swgBuilderLabels.tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ERouteNames.DOCS_ROUTE, app, document);

  const port = configService.get<number>('SERVER_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
