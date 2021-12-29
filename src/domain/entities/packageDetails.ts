import { Property, Embeddable } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import { PackageUnits } from '../../common/types/index';

@ObjectType()
@Embeddable()
export class Package{
  @Field()
  @Property()
  width: number;
  @Field()
  @Property()
  height: number
  @Field()
  @Property()
  length: number
  @Field(type => String, {defaultValue: PackageUnits.dimensionsUnit})
  @Property({onCreate: () => PackageUnits.dimensionsUnit})
  dimensionsUnit: string;
  @Field()
  @Property()
  weight: number
  @Field(type => String, {defaultValue: PackageUnits.weightUnit})
  @Property({onCreate: () => PackageUnits.weightUnit})
  weightUnit: string = PackageUnits.weightUnit;
}