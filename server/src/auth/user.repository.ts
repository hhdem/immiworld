import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserStatus, UserRole } from '../auth/auth.enum';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { Profile } from './profile.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password, ip, repassword } = authCredentialsDto;
    if (password != repassword) {
      throw new ForbiddenException('Password not suit.');
    }
    // TODO CHECK IF USERNAME EXISTS IN DB
    // console.info(authCredentialsDto);
    const user = this.create();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.status = UserStatus.NORMAL;
    user.showname = username;
    user.createDate = new Date();
    user.role = UserRole.NORMAL;
    user.ip = ip;
    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists.');
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePasswordWithRole(
    authCredentialsDto: AuthCredentialsDto,
    userRole?: UserRole,
  ): Promise<{ username: string; role: string; id: number; profile: Profile}> {
    const { username, password } = authCredentialsDto;
    const query = { username };
    // if (userRole === null || userRole === undefined) {
    //   userRole = UserRole.NORMAL;
    //   query.role = userRole;
    // }
    const user = await this.findOne(query);
    if (user && (await user.validatePassword(password))) {
      return { username: user.username, role: user.role, id: user.id, profile: user.profile };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    // return this.query('select id, count(id) from task group by id;');
    // console.log(all);
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('user');
    console.info('getUsers was called....');

    if (status) {
      query.andWhere('user.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(user.username like :search OR news.showname like :search)',
        {
          search: `%${search}%`,
        },
      );
    }
    query.orderBy('user.createDate', 'DESC');
    const tasks = await query.getMany();
    return tasks;
  }

  async getOneByShowname(showname: string) {
    const query = this.createQueryBuilder('user');
    if (showname) {
      query.andWhere('user.showname = :showname', { showname });
      const user = await query.getOne();
      return user;
    } else {
      return null;
    }
  }
}
