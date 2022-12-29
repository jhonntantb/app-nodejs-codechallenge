import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateMapper {
  async validateValue(data: any) {
    if (data.value > 0 && data.value <= 1000) {
      return { value: { ...data, status: 'approved' } };
    }

    return { value: { ...data, status: 'rejected' } };
  }
}
