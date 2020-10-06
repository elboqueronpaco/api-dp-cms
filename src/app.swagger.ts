import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('DpCms API')
        .addBearerAuth()
        .setDescription(
            'Esta es una API creada con NestJS con un CRUD básico para un CMS'
        )
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('/docs', app, document)
}