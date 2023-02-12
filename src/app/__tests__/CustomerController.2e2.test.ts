import "reflect-metadata";
import "dotenv/config";
import { customerFixture } from "./../../core/fixtures/customer";
import { Identifiers } from "./../../core/identifiers/Identifiers";
import { transactionFixture } from './../../core/fixtures/transaction';
import { TransactionRepository } from "./../../core/repositories/TransactionRepository";
import { CustomerRepository } from "./../../core/repositories/CustomerRepository";
import { CustomerController } from "./../controllers/CustomerController";
import { connectDB, dropCollections, dropDB } from "../../adapters/__tests__/setupDbTest";
import { createExpressServer, useContainer, useExpressServer } from "routing-controllers";
import { Kernel } from "../config/Kernel";
import * as request from "supertest";

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
  let customerRepository: CustomerRepository;
  let transactionRepository: TransactionRepository;


  beforeAll(async () => {
    await connectDB();

    const container = new Kernel();

    container.init();

    useContainer(container);

    useExpressServer(app, {
      controllers: [CustomerController],
    });

    customerRepository = container.get(Identifiers.customerRepository);
    transactionRepository = container.get(Identifiers.transactionRepository);
  });

  beforeEach(async () => {
    await customerRepository.create(customerFixture[0]);
    await customerRepository.create(customerFixture[1]);
    await transactionRepository.create(transactionFixture[0]);
    await transactionRepository.create(transactionFixture[1]);
  });

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDB();
  });

  it("POST - /customers", async () => {
    await request(app)
      .post("/customers")
      .send({
        firstname: "John",
        lastname: "Doe",
        birthdate: "15/05/1992",
      })
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.customer.props.id).toBeTruthy();
      })
      .expect(201);
  });

  it("GET - /customers/all", async () => {
    await request(app)
      .get("/customers/all")
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.customers).toHaveLength(2);
      })
      .expect(200);
  });

  it("GET - /customers/transactions/:customerId", async () => {
    await request(app)
      .get("/customers/transactions/1")
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.transactions).toHaveLength(2);
      })
      .expect(200);
  });
});
