import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidateMapper } from './validate-mapper';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ValidateMapper],
})
export class AppModule {}
