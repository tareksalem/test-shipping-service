import "reflect-metadata";
import { CarrierServices, ShipperType, PromiseResultInterface } from 'common/types';
import { ShipmentProfileRepository } from 'repositories';

let shipmentRepository: ShipmentProfileRepository;

beforeAll(async () => {
  shipmentRepository = new ShipmentProfileRepository;
  await shipmentRepository.init();
});

describe(('create  shipment profile'), () => {
  it('create shipment profile success', async () => {
    await shipmentRepository.createShipment({
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
  it('fails to create shipment without sending package details', async () => {
    await expect(shipmentRepository.createShipment(<any>{
      shipperId: ShipperType.fedex,
      carrierServiceId: CarrierServices.fedexAir,
    })).rejects.toBeInstanceOf(Error);
  });
});
describe('get all shipments', () => {
  it('get all shipments successfully', async () => {
    await expect(shipmentRepository.getAllShipments()).resolves.toBeInstanceOf(PromiseResultInterface);
  });
});