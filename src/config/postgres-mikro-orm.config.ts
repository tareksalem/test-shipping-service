import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ShipmentProfile, Package } from '../domain/entities';

const isTypeScript = __filename.endsWith('ts');

export default  {
  migrations: {
    path: path.join(__dirname, '../migrations'),
    pattern: /^[\w]+d+\.[tj]s$/,
    emit: isTypeScript ? 'ts': 'js',
    tableName: 'migrations',
    transactional: true,
    allOrNothing: true,
  },
  tsNode: isTypeScript,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  metadataProvider: TsMorphMetadataProvider,
  entities: [ShipmentProfile, Package],
  entitiesTs: [ShipmentProfile, Package],
  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];
