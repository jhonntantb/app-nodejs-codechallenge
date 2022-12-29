import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('validate_information')
  validateInformation(@Payload() message) {
    console.log('esta es la data que nos llega', message);
    return this.appService.validateInformation(message);
  }
}
