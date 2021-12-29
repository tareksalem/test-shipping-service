import { InjectService } from "grand-connectors";
import { ShipmentProfileRepository } from "../repositories";
import { CreateShipmentProfile } from '../common/types/interfaces';
import { PromiseResultInterface, ShipperType } from "../common/types";
import { FedexService } from './fedex.service';
import { UpsService } from "./ups.service";

@InjectService('this', ShipmentProfileRepository)
@InjectService('this', FedexService)
@InjectService('this', UpsService)
export class ShipmentService{
  public shipmentProfileRepository: ShipmentProfileRepository;
  private fedexService: FedexService;
  private upsService: UpsService;
  public async createShipment(data: CreateShipmentProfile): Promise<PromiseResultInterface> {
    try {
      // send shipment to platform
      if (data.shipperId === ShipperType.fedex) {
        await this.fedexService.createShipment(data);
      } else if (data.shipperId === ShipperType.ups) {
        await this.upsService.createShipment(data);
      }
      return await this.saveShipmentProfile(data);
    } catch (err) {
      return Promise.reject(new PromiseResultInterface({ success: false, err }));
    }
  }
  private async saveShipmentProfile(data: CreateShipmentProfile): Promise<PromiseResultInterface> {
    try {
      return await this.shipmentProfileRepository.createShipment(data);
    } catch (err) {
      throw err;
    }
  }
  public async getAllShipments(): Promise<PromiseResultInterface> {
    return await this.shipmentProfileRepository.getAllShipments();
  }
}