import {
  Controller,
  UseGuards,
  Put,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Post,
  Get,
  Logger,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../base/guards/roles.guard';
import { UserRole, UserStatus } from './auth.enum';
import { Roles } from '../base/decorator/roles.decorator';
import { UserStatusValidationPipe } from './pipes/user-status-validation.pipe';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AdminService } from './admin.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('管理员')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
  ) {}
  private logger = new Logger('AdminController');

  
  /**
   * 后端登录
   * @param authCredentialsDto
   */
  @ApiOperation({ summary: '管理员登录' })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.adminService.signIn(authCredentialsDto);
  }

  /**
   * 更新用户状态
   * @param id
   * @param status
   */
   @ApiOperation({ summary: '更新用户状态' })
   @ApiBody({
      type: 'string',
      description: "用户状态",
      examples: {
        a: {
          summary: "正常状态",
          value: { status: UserStatus.NORMAL}
        },
        b: {
          summary: "禁用状态",
          value: { status: UserStatus.FORBIDDEN}
        },
        c: {
          summary: "删除状态",
          value: { status: UserStatus.DELETED}
        }
      }
  })
  @ApiBearerAuth('authorization')
  @Put('/:id/status')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', UserStatusValidationPipe) status: UserStatus,
  ) {
    return await this.adminService.updateUserStatus(id, status);
  }

  @Get('/users')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  async users(
    @Query(ValidationPipe) filterDto: GetUsersFilterDto,
  ): Promise<User[]> {
    return await this.userService.getUsers(filterDto);
  }
}

