import 'reflect-metadata';
import { customerFixture } from './../../core/fixtures/customer';
import { MongoDbCustomerRepository } from './../repositories/repositories/MongoDbCustomerRepository';
import { connectDB, dropCollections, dropDB } from "./setupDbTest";

describe("Integration - MongoDbCustomerRepository", () => {
    let mongoDbCustomerRepository: MongoDbCustomerRepository

  beforeAll(async () => {
    await connectDB();

    mongoDbCustomerRepository = new MongoDbCustomerRepository()
  });

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDB();
  });

  it("should create a customer", async () => {
    const result = await mongoDbCustomerRepository.create(customerFixture[0])
    expect(result.props.id).toEqual(customerFixture[0].props.id)
  });

  it("should get all customers", async () => {
    await mongoDbCustomerRepository.create(customerFixture[0])
    await mongoDbCustomerRepository.create(customerFixture[1])
    const result = await mongoDbCustomerRepository.getAllCustomers()
    expect(result).toHaveLength(2)
  })
});
