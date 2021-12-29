import { DataSource } from 'grand-connectors';
import { Connection, IDatabaseDriver, MikroORM, EntityManager } from '@mikro-orm/core';

import setting from '../../config';
export class PostgrDataSource extends DataSource{
  type = "postgerSql"
  private _orm: MikroORM<IDatabaseDriver<Connection>>;
  public connected: boolean = false;
  public failed: boolean = false;
  public async connect() {
    try {
      if (setting.testingMode()) {
        return await this.connectForTest();
      } else {
        return await this.connectToDatabase();
      }
    } catch (error) {
      this.failed = true;
      console.error('database connection error', error);
      process.exit(1);
      }
  }
  public async connectToDatabase() {
    if (!this.connected) {
      this._orm = await MikroORM.init(setting.dbSetting);
      this.connected = true;
      await this.runMigration();
    }
  }
  public async runMigration() {
    try {
      const migrator = this._orm.getMigrator();
      const schemaGenerator = this._orm.getSchemaGenerator();
      const pendingMigrations = await migrator.getPendingMigrations();
      const executedMigrations = await migrator.getExecutedMigrations();
      if (pendingMigrations?.length > 0) {
        await migrator.up();
      }
      else if (executedMigrations?.length === 0) {
        await migrator.createMigration();
        await schemaGenerator.updateSchema();
      }
    } catch (err) {
      throw err;
    }
  }
  public async connectForTest() {
    try {
      if (!this.connected) {
        this._orm = await MikroORM.init(setting.testDbSetting).then(async (orm) => {
          const generator = orm.getSchemaGenerator();
          await generator.createSchema().catch();
          return orm;
        });
        console.log('======================= db is connected');
        this.connected = true;
      }
    } catch (error) {
      this.failed = true;
      console.error('database connection error', error);
      throw Error(error);
    }
}
  public async getOrm(): Promise<MikroORM<IDatabaseDriver<Connection>>> {
    return new Promise((resolve) => {
      if (this.connected) {
        return resolve(this._orm);
      } else {
        const interval = setInterval(() => {
          if (this.connected) {
            clearInterval(interval);
            return resolve(this._orm);
          } else if (this.failed) {
            clearInterval(interval);
          }
        }, 1);
      }
    });
  }
  public async disConnect() {
    return this._orm.close(true);
  }
}
