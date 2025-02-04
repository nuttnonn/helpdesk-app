import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface AppConfig {
    PORT: number;
}

async function bootstrap () {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) => {
                const firstError = errors[0];
                const message = firstError.constraints
                    ? Object.values(firstError.constraints)[0]
                    : 'Validation error';
                return new UnprocessableEntityException(message);
            },
        }),
    );

    const config = new DocumentBuilder()
    .setTitle('Helpdesk API')
    .setDescription('API documentation for the Helpdesk system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    const configService = app.get<ConfigService<AppConfig>>(ConfigService);
    const port = configService.get<number>('PORT' as keyof AppConfig) || 3000;
    await app.listen(port);

    console.log(`API Documentation available at: http://localhost:${port}/api`);
}

bootstrap();
