import {
  Repository,
  BaseEntity,
  AbstractRepository,
  FindManyOptions,
} from 'typeorm';

export abstract class CommonRepository<
  T extends BaseEntity
> extends AbstractRepository<T> {
  /**
   * Defines the master entity of this repository.
   *
   * @abstract
   * @type {string}
   * @memberof BaseCommonRepository
   */
  public abstract _entityIdentifier: string;

  /**
   * Defines the default values that needs to be created in the database bootstrap phase for that repository specifically.
   *
   * @abstract
   * @returns {Promise<void>}
   * @memberof BaseCommonRepository
   */
  public abstract InitDefaults(): Promise<void>;

  /**
   * Returns the master repository of this custom repository.
   *
   * @readonly
   * @type {Repository<T>}
   * @memberof BaseCommonRepository
   */
  public get rootRepository(): Repository<T> {
    return this.repository;
  }

  /**
   * Exposes a generic find function accepting a generic expression as an argument.
   *
   * @param {FindManyOptions<T>} e
   * @returns {Promise<T[]>}
   * @memberof BaseCommonRepository
   */
  public async find(e: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(e);
  }

  public async findSubTablePage(
    page: number,
    num: number,
    T: any,
    subprop: string,
    subclass: string,
  ) {
    const users = await this.createQueryBuilder('t')
      .leftJoinAndSelect('t.' + subprop, subclass)
      .skip(5)
      .take(10)
      .getMany();
    return users;
  }
}
