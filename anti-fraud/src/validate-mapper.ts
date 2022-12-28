import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateMapper {
  async validateValue(value: number) {
    if (value > 0 && value <= 1000) return 'approved';
    return 'rejected';
  }
}
