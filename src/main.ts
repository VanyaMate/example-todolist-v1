import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: (origin, callback) => {
                callback(null, origin);
            },
            credentials: true
        }
    });
    app.use(cookieParser())

    const config = new DocumentBuilder()
        .setTitle('Todo API')
        .setDescription('Документация для работы с API')
        .setVersion('0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT).then(() => console.log('server started on', PORT));
}
bootstrap();
