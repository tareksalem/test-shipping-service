import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import setting from '../config';
import { schemaBuilder } from '../common/utils';

export default class Application {
  public httpServer: http.Server;
  public app: express.Application;
  public server: ApolloServer;
  constructor() {
  }
  public async init() {
    try {
      this.app = express();
      this.httpServer = http.createServer(this.app);
      const schema = await schemaBuilder();
      this.server = new ApolloServer({
        playground: true,
        schema,
        context: ({ req }) => ({ req }),
        plugins: [<any>ApolloServerPluginDrainHttpServer({
          httpServer: <any>this.httpServer
        })],
      });
      await this.server.start();
      this.server.applyMiddleware({ app: this.app, path: '/graphql' });
      await new Promise<void>(resolve => this.httpServer.listen(setting.PORT, resolve));
      console.log('server is initialized');
    } catch (err) {
      throw err;
    }
  }
}
