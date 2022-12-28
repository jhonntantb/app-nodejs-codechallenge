import { Injectable } from '@nestjs/common';
import { ValidateMapper } from './validate-mapper';

@Injectable()
export class AppService {
  constructor(private mapper: ValidateMapper) {}
  validateInformation(data: number): any {
    const response = this.mapper.validateValue(data);
    return response;
  }
}
