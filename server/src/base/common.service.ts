import { I18nRequestScopeService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { CommonRepository } from './common.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommonService {
  constructor(private readonly i18n: I18nRequestScopeService) {}

  async getI18NText(i18n: string, args?: any): Promise<string> {
    return await this.i18n.translate(i18n, {
      args: args,
    });
  }

  async findSubTablePage(page: number, num: number, t: any) {
    // const users = await this.commonRepository.findSubTablePage(
    //   page,
    //   num,
    //   t,
    //   'likedNews',
    //   'news',
    // );
  }
}
