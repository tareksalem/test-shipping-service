import postgresSetting from './postgres-mikro-orm.config';
import testDbSetting from './sqlit-mikro-orm.config';
const setting = {
  PORT: Number.parseInt(<string>process.env.PORT) || 3000,
  dbSetting: postgresSetting,
  testDbSetting,
  environment: process.env.NODE_ENV || 'development',
  initialMigration: process.env.DB_INITIAL_MIGRATION,
  developmentMode: function () {
    return this.environment === 'development' ? true : false;
  },
  testingMode: function () { return this.environment === 'test' ? true : false },
};

export default setting;
