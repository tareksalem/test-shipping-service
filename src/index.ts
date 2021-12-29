import {config} from 'dotenv';
config();
import "reflect-metadata";
import Application from "./application/application";



(async () => {
  const application = new Application();
  await application.init();
})()