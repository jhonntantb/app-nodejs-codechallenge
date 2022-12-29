import { Injectable } from '@nestjs/common';
import { ValidateMapper } from './validate-mapper';

@Injectable()
export class AppService {
  constructor(private mapper: ValidateMapper) {}
  async validateInformation(data: number): Promise<any> {
    const response = await this.mapper.validateValue(data);
    return response;
  }
}
