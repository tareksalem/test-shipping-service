import { UpsCarrierService, UpsShipmentPayload, PromiseResultInterface } from "../common/types";
import { convertCmToInch, convertGmToPound } from "../common/utils";
import { CreateShipmentProfile } from '../common/types/interfaces';


export class UpsService{
  async createShipment(data: CreateShipmentProfile): Promise<PromiseResultInterface> {
    try {
      let { width, height, length, weight } = data.package;
      width = convertCmToInch(width);
      height = convertCmToInch(height);
      length = convertCmToInch(length);
      weight = convertGmToPound(weight);
      const payload: UpsShipmentPayload = { shipmentServiceID: UpsCarrierService[data.carrierServiceId], package: { width, height, length, weight } };
      // call the service here
      return Promise.resolve(new PromiseResultInterface({ success: true, data: payload }));
    } catch (err) {
      throw err;
    }
  }
}