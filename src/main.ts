import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

dotenv.config({});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.use(helmet());
  app.enableCors();

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Quantum Git")
    .setDescription("Backend application for the Quantum Git Project, built to track all commits of a git repository.")
    .setVersion("1.0")
    .addBearerAuth()
    .setBasePath("/api")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("api", app, swaggerDocument);

  await app.listen(parseInt(process.env.PORT));
}

bootstrap();
