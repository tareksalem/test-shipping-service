import { FedexCarrierService, FedexShipmentPayload, PromiseResultInterface } from "../common/types";
import { CreateShipmentProfile } from '../common/types/interfaces';


export class FedexService{
  async createShipment(data: CreateShipmentProfile): Promise<PromiseResultInterface> {
    try {
      const { width, height, length, weight } = data.package;
      const payload: FedexShipmentPayload = { carrierServiceID: FedexCarrierService[data.carrierServiceId], packageDetails: { width, height, length, weight } };
      // call the service here
      return Promise.resolve(new PromiseResultInterface({ success: true, data: payload }));
    } catch (err) {
      throw err;
    }
  }
}