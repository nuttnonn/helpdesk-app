import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
    PORT: number;
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    const configService = app.get<ConfigService<AppConfig>>(ConfigService);
    const port = configService.get<number>('PORT' as keyof AppConfig) || 3000;
    await app.listen(port)
}

bootstrap();
