import 'reflect-metadata';
import { InstalmentErrors } from '../../core/errors/InstalmentErrors';
import { Instalment } from './../../core/Entities/Instalment';
import { instalmentFixtures } from './../../core/fixtures/instalment';
import { MongoDbInstalmentRepository } from './../repositories/repositories/MongoDbInstalmentRepository';
import { connectDB, dropCollections, dropDB } from "./setupDbTest";

describe("Integration - MongoDbCustomerRepository", () => {
    let mongoDbInstalmentRepository: MongoDbInstalmentRepository
    let instalments: Instalment[]

  beforeAll(async () => {
    await connectDB();
    mongoDbInstalmentRepository = new MongoDbInstalmentRepository()
  });

  beforeEach(async () => {
    instalments = await mongoDbInstalmentRepository.create(instalmentFixtures)
  })

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDB();
  });

  it("should create instalments", async () => {
    expect(instalments).toHaveLength(3)
    })

   it("should get all by transaction id", async () => {
    const result = await mongoDbInstalmentRepository.getAllByTransactionId(instalmentFixtures[0].props.transaction_id)
    expect(result).toHaveLength(3)
   }) 

   it("should get instalment by id", async () => {
    const result = await mongoDbInstalmentRepository.getById(instalmentFixtures[0].props.id)
    expect(result.props.transaction_id).toEqual("1")
   })

   it("should throw if instalment id is not found", async () => {
    const result = mongoDbInstalmentRepository.getById("fake id")
    await expect(result).rejects.toThrow(InstalmentErrors.NotFound)
   })

   it("should throw if transaction id is not found", async () => {
    const result = mongoDbInstalmentRepository.getAllByTransactionId("fake transaction id")
    await expect(result).rejects.toThrow(InstalmentErrors.NotFound)
   })

   it("should update instalment", async () => {
    const instalment = instalmentFixtures[0]
    instalment.pay()

    const result = await mongoDbInstalmentRepository.update(instalment)
    expect(result.props.is_paid).toBeTruthy()
   })

});