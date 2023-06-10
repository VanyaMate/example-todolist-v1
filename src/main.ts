import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

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
    await app.listen(PORT).then(() => console.log('server started on', PORT));
}
bootstrap();
