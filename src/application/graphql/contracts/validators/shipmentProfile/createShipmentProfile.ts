import { ArgsType, Field, InputType } from "type-graphql";
import { IsString, IsNumber, Min, IsEnum, IsObject, ValidateNested} from 'class-validator';
import { CarrierServices, Package, ShipperType } from "../../../../../common/types";
import { CreatePackage, CreateShipmentProfile } from "../../../../../common/types/interfaces";
import { checkCarrierServiceId } from "../decorators";

@InputType()
export class CreateShipmentPackageInputType implements Partial<CreatePackage> {
  @Field()
  @IsNumber()
  @Min(0)
  public width: number;
  @Field()
  @IsNumber()
  @Min(0)
  public height: number;
  @Field()
  @IsNumber()
  @Min(0)
  public length: number;
  @Field()
  @IsNumber()
  // @IsString()
  @Min(200)
  public weight: number;
}

@InputType()
export class CreateShipmentProfileInputType implements Partial<CreateShipmentProfile> {
  @Field(type => ShipperType)
  @IsEnum(ShipperType)
  public shipperId: ShipperType;
  @Field(type => CarrierServices)
  @IsEnum(CarrierServices)
  @checkCarrierServiceId()
  public carrierServiceId: CarrierServices;
  @Field(type => CreateShipmentPackageInputType)
  @IsObject()
  public package: CreateShipmentPackageInputType
}

@ArgsType()
export class CreateShipmentProfileArgumentsType{
  @Field(type => CreateShipmentProfileInputType)
  @ValidateNested()
  data: CreateShipmentProfileInputType;

}