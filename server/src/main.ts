import * as serveStatic from 'serve-static';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';
const ENV = process.env.NODE_ENV;
// import { HttpExceptionFilter } from './base/filters/http-exception.filter';
// import { CommonService } from './base/common.service';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  app.use(
    '/upload',
    serveStatic(path.join(__dirname, '../upload'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif'],
    }),
  );
  //....
  app.useGlobalPipes(new ValidationPipe());
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });

  if (ENV !== 'prod') {
    const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API description')
      .setVersion('1.0')
      .addBearerAuth(
        { name: 'authorization', type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'Header' },
        'authorization',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  // const commonService = app.get(CommonService);
  // app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listing ${port}`);
}
bootstrap();
