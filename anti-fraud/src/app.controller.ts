import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('validate_information')
  validateInformation(@Payload() message) {
    return this.appService.validateInformation(message);
  }
}
