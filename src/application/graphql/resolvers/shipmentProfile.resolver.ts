import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { InjectService } from "grand-connectors";
import { ShipmentService } from "../../../services/shipmentProfile.service";
import { CreateShipmentProfileInputType } from '../contracts/validators/shipmentProfile/createShipmentProfile';
import { Context } from '../contracts/types';
import { ShipmentProfile } from '../../../domain/entities';
@Resolver()
@InjectService('this', ShipmentService)
export class ShipmentProfileResolver{
  shipmentService: ShipmentService;
  @Mutation(() => ShipmentProfile, {nullable: true})
  public async createShipmentProfile(
    @Arg('data') data: CreateShipmentProfileInputType, @Ctx() ctx: Context
  ): Promise<ShipmentProfile> {
    try {
      const result = await this.shipmentService.createShipment(data);
      return result.data;
    } catch (err) {
      return err.err;
    }
  }
  @Query(returns => [ShipmentProfile])
  public async getShipments(): Promise<ShipmentProfile[]> {
    const result = await this.shipmentService.getAllShipments();
    return result.data;
  }
}