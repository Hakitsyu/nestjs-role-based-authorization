import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigurationModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
