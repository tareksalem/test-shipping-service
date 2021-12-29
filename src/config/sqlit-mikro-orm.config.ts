import { MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ShipmentProfile, Package } from '../domain/entities';

export default {
  dbName: ":memory:",
  type: "sqlite",
  metadataProvider: TsMorphMetadataProvider,
  entities: [ShipmentProfile, Package],
  // debug: process.env.NODE_ENV === "development",
} as Parameters<typeof MikroORM.init>[0];