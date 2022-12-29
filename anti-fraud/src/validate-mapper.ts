import { Injectable } from '@nestjs/common';
// valida la informacion y emite una respuesta
@Injectable()
export class ValidateMapper {
  async validateValue(data: any) {
    if (data.value > 0 && data.value <= 1000) {
      return { value: { ...data, status: 'approved' } };
    }

    return { value: { ...data, status: 'rejected' } };
  }
}
