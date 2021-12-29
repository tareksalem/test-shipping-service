import { buildSchema } from 'type-graphql';
import { ShipmentProfileResolver } from '../../application/graphql/resolvers';
import setting from '../../config';

export const schemaBuilder = () => {
  return buildSchema({
    emitSchemaFile: setting.developmentMode(),
    resolvers: [ShipmentProfileResolver],
    dateScalarMode: 'isoDate'
  });
}