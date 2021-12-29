import { RecursivePartial, ShipperType } from "../../common/types";
import { Package, ShipmentProfile } from "../../domain/entities";

export interface CreatePackage extends Partial<Package> {
  width: number;
  height: number;
  length: number;
  weight: number;
}

export interface CreateShipmentProfile extends RecursivePartial<ShipmentProfile>{
  package: CreatePackage;
}