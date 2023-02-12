import "reflect-metadata";
import "dotenv/config";
import { connectDB, dropCollections, dropDB} from "../../adapters/__tests__/setupDbTest";
import { createExpressServer, useContainer, useExpressServer } from "routing-controllers";
import { Kernel } from "../config/Kernel";
import * as request from "supertest";
import { statusController } from './../controllers/StatusController';

const app = createExpressServer({
  defaults: {
    nullResultCode: 404,
    undefinedResultCode: 204,
    paramOptions: {
      required: false,
    },
  },
});

describe("E2E - CustomerController", () => {

  beforeAll(async () => {
    await connectDB();

    const container = new Kernel();

    container.init();

    useContainer(container);

    useExpressServer(app, {
      controllers: [statusController],
    });
  });

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDB();
  });

  it("GET - /status", async () => {
    await request(app)
      .get("/status")
      .expect(200);
  });
});
