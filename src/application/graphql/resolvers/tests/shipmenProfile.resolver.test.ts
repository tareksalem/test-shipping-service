import "reflect-metadata";
import { ShipperType, CarrierServices } from "common/types";
import { gCall } from "common/utils";
import { PostgrDataSource } from 'application/dataSources';
import { ShipmentService } from "services/shipmentProfile.service";

beforeAll(async () => {
  const shipmentService = new ShipmentService();
  await shipmentService.shipmentProfileRepository.init();
});

const createShipmentMutation = `
  mutation createShipmentProfile($data: CreateShipmentProfileInputType!) {
    createShipmentProfile(data: $data) {
      id
      shipperId
    }
  }
  `;

describe('create shipment mutation test', () => {
  it('should create shipment successfully', async () => {
    console.log('========== reached', process.env.NODE_ENV);
    const result = await gCall({
      source: createShipmentMutation,
      variables: {
        data: {
          shipperId: ShipperType.fedex,
          carrierServiceId: CarrierServices.fedexAir,
          package: {
            width: 100,
            height: 100,
            length: 240,
            weight: 300
          }
        }
      }
    })
    expect(result.data.createShipmentProfile).toHaveProperty('id');
  });
  it('should fail shipment with non matched shipper type validation', async () => {
    console.log('========== reached', process.env.NODE_ENV);
    expect(gCall({
      source: createShipmentMutation,
      variables: {
        data: {
          shipperId: ShipperType.ups,
          carrierServiceId: CarrierServices.fedexAir,
          package: {
            width: 100,
            height: 100,
            length: 240,
            weight: 300
          }
        }
      }
    })).resolves.toMatchObject({data: {createShipmentProfile: null}});
  });
})