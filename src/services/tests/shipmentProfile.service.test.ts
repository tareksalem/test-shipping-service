import "reflect-metadata";
import { CarrierServices, ShipperType } from 'common/types';
import { ShipmentService } from 'services';
import { PromiseResultInterface } from '../../common/types/index';

let shipmentService: ShipmentService;

beforeAll(async () => {
  shipmentService = new ShipmentService();
  await shipmentService.shipmentProfileRepository.init();
});

describe(('shipment service'), () => {
  it('create shipment profile from service', async () => {
    await shipmentService.createShipment({
      shipperId: ShipperType.fedex,
      carrierServiceId: CarrierServices.fedexAir,
      package: {
        width: 100,
        height: 100,
        length: 240,
        weight: 300
      }
    });
  });
  it('fails to create shipment without sending package details from service', async () => {
    await expect(shipmentService.createShipment(<any>{
      shipperId: ShipperType.fedex,
      carrierServiceId: CarrierServices.fedexAir,
    })).rejects.toBeInstanceOf(PromiseResultInterface);
  });
})
describe('get all shipments from service', () => {
  it('get all shipments successfully', async () => {
    await expect(shipmentService.getAllShipments()).resolves.toBeInstanceOf(PromiseResultInterface);
  });
});