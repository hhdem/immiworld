import { Column, BaseEntity } from 'typeorm';

export class ApiBase extends BaseEntity {
  
    @Column()
    device: Device = Device.WEB;
}

export enum Device {
    WEB = 'WEB',
    ANDROID = 'ANDROID',
    IPHONE = 'IPHONE',
  }