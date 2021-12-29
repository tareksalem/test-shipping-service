import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { shipperMapper} from '../../../../../common/types/index';
import { CreateShipmentProfile } from '../../../../../common/types/interfaces';

export function checkCarrierServiceId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'checkCarrierServiceId',
      target: object.constructor,
      propertyName: propertyName,
      // constraints: [property],
      options: validationOptions,
      validator: {
        validate(carrierServiceId: any, args: ValidationArguments) {
          const payload: CreateShipmentProfile = args.object as CreateShipmentProfile;
          const { shipperId } = payload;
          return shipperMapper[shipperId][carrierServiceId];
        },
      },
    });
  };
}