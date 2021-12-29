import { Entity, Property, PrimaryKey, Embedded, Enum } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ObjectType, Field, GraphQLISODateTime } from 'type-graphql';
import { Package } from './packageDetails';
import { ShipperType, CarrierServices } from '../../common/types';

@ObjectType()
@Entity()
export class ShipmentProfile {
  @Field()
  @PrimaryKey()
  id: string = v4();
  @Field(type => ShipperType)
  @Enum()
  public shipperId: ShipperType;
  @Field(type => CarrierServices)
  @Enum()
  public carrierServiceId: CarrierServices;
  @Field(type => Package)
  @Embedded()
  package: Package;
  @Field(type => GraphQLISODateTime)
  @Property()
  createdAt: Date = new Date();
  @Field(type => GraphQLISODateTime)
  // @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}