import "dotenv/config";
import "reflect-metadata";
import { TransactionController } from './../controllers/TransactionController';
import { customerFixture } from "./../../core/fixtures/customer";
import { Identifiers } from "./../../core/identifiers/Identifiers";
import { InstalmentRepository } from "./../../core/repositories/InstalmentRepository";
import { connectDB, dropCollections, dropDB } from "../../adapters/__tests__/setupDbTest";
import { createExpressServer, useContainer, useExpressServer } from "routing-controllers";
import { Kernel } from "../config/Kernel";
import * as request from "supertest";
import { instalmentFixtures } from './../../core/fixtures/instalment';


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
  let instalmentRepository: InstalmentRepository;

  beforeAll(async () => {
    await connectDB();

    const container = new Kernel();

    container.init();

    useContainer(container);

    useExpressServer(app, {
      controllers: [TransactionController],
    });

    instalmentRepository = container.get(Identifiers.instalmentRepository);
  });

  beforeEach(async () => {
    await instalmentRepository.create(instalmentFixtures);
  
  });

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDB();
  });

  it("POST - /transactions", async () => {
    await request(app)
      .post("/transactions")
      .send({
        ammout: 1000.87,
        customer_id: customerFixture[0].props.id,
        is_online: true,
        split: 4,
        store_name: "The Store"
      })
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.transaction.props.id).toBeTruthy();
      })
      .expect(201);
  });

  it("GET - transactions/instalments/:transactionId", async () => {
    await request(app)
      .get("/transactions/instalments/1")
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.instalments).toHaveLength(3);
      })
      .expect(200);
  });

  it("PATCH - transactions/instalments/:instalmentId", async () => {
    await request(app)
      .patch("/transactions/instalments/1")
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.instalment.props.is_paid).toBeTruthy();
      })
      .expect(200);
  });
});
