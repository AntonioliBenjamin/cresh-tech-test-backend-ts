import 'reflect-metadata';
import { transactionFixture } from './../../core/fixtures/transaction';
import { MongoDbTransactionRepository } from './../repositories/repositories/MongoDbTransactionRepository';
import { Transaction } from './../../core/Entities/Transaction';
import { Instalment } from './../../core/Entities/Instalment';
import { instalmentFixtures } from './../../core/fixtures/instalment';
import { MongoDbInstalmentRepository } from './../repositories/repositories/MongoDbInstalmentRepository';
import { connectDB, dropCollections, dropDB } from "./setupDbTest";
import { TransactionErrors } from '../../core/errors/TransactionErrors';

describe("Integration - MongoDbCustomerRepository", () => {
    let mongoDbInstalmentRepository: MongoDbInstalmentRepository
    let mongoDbTransactionRepository: MongoDbTransactionRepository
    let instalments: Instalment[]
    let transaction: Transaction

  beforeAll(async () => {
    await connectDB();
    mongoDbInstalmentRepository = new MongoDbInstalmentRepository()
    mongoDbTransactionRepository = new MongoDbTransactionRepository()
  });

  beforeEach(async () => {
    instalments = await mongoDbInstalmentRepository.create(instalmentFixtures)
    transaction = await mongoDbTransactionRepository.create(transactionFixture[0])
    await mongoDbTransactionRepository.create(transactionFixture[1])
  })

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDB();
  });

  it("should create transaction", async () => {
    expect(transaction.props.id).toEqual(transactionFixture[0].props.id)
    })

   it("should get transaction by id", async () => {
    const result = await mongoDbTransactionRepository.getById(transactionFixture[0].props.id)
    expect(result.props.id).toEqual(transactionFixture[0].props.id)
   }) 

   it("should get transactions by customer id", async () => {
    const result = await mongoDbTransactionRepository.getTransactionsByCustomerId(transactionFixture[0].props.customer_id)
    expect(result).toHaveLength(2)
   })

   it("should throw if customer id is not found", async () => {
    const result = mongoDbTransactionRepository.getTransactionsByCustomerId("fake id")
    await expect(result).rejects.toThrow(TransactionErrors.NotFound)
   })

   it("should throw if transaction id is not found", async () => {
    const result = mongoDbTransactionRepository.getById("fake transaction id")
    await expect(result).rejects.toThrow(TransactionErrors.NotFound)
   })

   it("should update instalment", async () => {
    const transaction = transactionFixture[0]
    transaction.complete()

    const result = await mongoDbTransactionRepository.update(transaction)
    expect(result.props.is_completed).toBeTruthy()
   })

});