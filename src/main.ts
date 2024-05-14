if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors({
  //   origin: '*',
  // });

  const config = new DocumentBuilder()
    .setTitle('Medium Clone API')
    .setDescription('API for Medium Clone application')
    .setVersion('1.0')
    .addTag('medium-clone')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => console.log(`Server works on port: ${PORT}`));
}
bootstrap();
