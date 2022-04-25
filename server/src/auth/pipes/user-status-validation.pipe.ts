import { PipeTransform, BadRequestException } from '@nestjs/common';
import { UserStatus } from '../auth.enum';

export class UserStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    UserStatus.NORMAL,
    UserStatus.FORBIDDEN,
    UserStatus.DELETED,
  ];
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`User status "${value}" is not allowed`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
