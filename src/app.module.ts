import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  controllers: [AppController],
  exports: [PassportModule],
  providers: [AppService],
})
export class AppModule {}
