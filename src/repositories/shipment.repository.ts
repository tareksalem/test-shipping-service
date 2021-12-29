import { MikroORM, IDatabaseDriver, Connection, GetRepository, EntityRepository } from '@mikro-orm/core';
import { InjectDataSource, Repository } from 'grand-connectors';
import { PostgrDataSource } from '../application/dataSources';
import { ShipmentProfile } from '../domain/entities';
import { PromiseResultInterface } from '../common/types';
import { CreateShipmentProfile } from '../common/types/interfaces';

export class ShipmentProfileRepository extends Repository{
  @InjectDataSource(PostgrDataSource)
  public postGersSqlDataSource: PostgrDataSource;
  public model: EntityRepository<ShipmentProfile>;
  constructor() {
    super();
    // this.postGersSqlDataSource.getOrm().then(orm => this.model = orm.em.getRepository(ShipmentProfile)).catch();
  }
  async init() {
    const orm = await this.postGersSqlDataSource.getOrm();
    this.model = orm.em.getRepository(ShipmentProfile);
  }
  public async createShipment({ shipperId, carrierServiceId, package: packageDetails }: CreateShipmentProfile): Promise<PromiseResultInterface> {
    const shipmentProfile = this.model.create({ shipperId, carrierServiceId, package: packageDetails });
    const rs = await this.model.persistAndFlush(shipmentProfile);
    return Promise.resolve(new PromiseResultInterface({ success: true, data: shipmentProfile }));
  }
  public async getAllShipments(): Promise<PromiseResultInterface> {
    const shipments = await this.model.findAll();
    return Promise.resolve(new PromiseResultInterface({ success: true, data: shipments }));
  }
}
