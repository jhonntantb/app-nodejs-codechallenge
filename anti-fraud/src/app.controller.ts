import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('validate_information')
  validateInformation(data: any) {
    console.log('esta es la data que nos llega', data);
    return this.appService.validateInformation(data);
  }
}
