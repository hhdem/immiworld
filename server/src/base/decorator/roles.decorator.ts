import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../auth/auth.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
