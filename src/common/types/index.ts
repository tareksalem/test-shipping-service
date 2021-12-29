import { registerEnumType } from "type-graphql";

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export enum ShipperType{
  fedex = 'fedex',
  ups = 'ups'
}

export enum PackageUnits{
  dimensionsUnit = 'cm',
  weightUnit = 'gram'
}
export enum FedexCarrierService {
  fedexAir = 'fedexAir',
  fedexGround = 'fedexGround',
}
export enum UpsCarrierService {
  UPSExpress = 'UPSExpress',
  UPS2DAY = 'UPS2DAY'
}
export enum CarrierServices {
  fedexAir = 'fedexAir',
  fedexGround = 'fedexGround',
  UPSExpress = 'UPSExpress',
  UPS2DAY = 'UPS2DAY'
}
export const shipperMapper = {
  [ShipperType.fedex]: {...FedexCarrierService},
  [ShipperType.ups]: {...UpsCarrierService}
    
}
export class PromiseResultInterface {
  success: boolean
  data?: any
  err?: Error | PromiseResultInterface | Error[] | PromiseResultInterface[];
  constructor({success, data, err }: {success: boolean, data?: any, err?:  Error | PromiseResultInterface | Error[] | PromiseResultInterface[]}) {
    this.success = success;
    this.data = data;
    this.err = err;
  }
}
export interface Package{
  width: number;
  height: number;
  length: number;
  weight: number;
}
export interface FedexShipmentPayload {
  carrierServiceID: FedexCarrierService,
  packageDetails: Package;
}
export interface UpsShipmentPayload {
  shipmentServiceID: UpsCarrierService,
  package: Package;
}

registerEnumType(ShipperType, { name: 'ShipperType' });
registerEnumType(CarrierServices, { name: 'CarrierServices' });