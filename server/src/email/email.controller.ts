import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailStatus } from 'src/auth/auth.enum';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/auth/user.entity';
import { UserService } from 'src/auth/user.service';
import { EmailService } from './email.service';

@ApiTags('邮件')
@Controller('email')
export class EmailController {

    constructor(
        private userService: UserService, 
        private emailService: EmailService,
    ) {}

    @ApiOperation({ summary: '发送激活邮件' })
    @ApiBearerAuth('authorization')
    @Post('/active')
    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.OK)
    async activeEmail(
        @Body() body: CreateUserDto,
        @GetUser() user: User,
    ): Promise<boolean> {
        // 检查邮件是否已经存在, 是否为邮箱
        if (user.emailStatus == EmailStatus.INACTIVE) {
            // 发送激活邮件
            const u = await this.emailService.sendActiveEmail(body.email, user);
            // 成功发送则，设置激活状态为 EmailStatus.SENTCODE
            if (u) {
                await this.userService.changeEmailStatus(user.id, EmailStatus.SENTCODE);
            }
            return u;
        }
    }

    @ApiOperation({ summary: '点击激活链接' })
    @Get('/confirmactive/:confirmcode')
    @HttpCode(HttpStatus.OK)
    async confirmActiveEmail(
        @Param('confirmcode') confirmcode: string,
        @GetUser() user: User,
    ) {
        // 查询confirmcode，设置用户状态 EmailStatus.ACTIVE
        await this.emailService.activeStatusByConfirmcode(confirmcode);
    }
}
