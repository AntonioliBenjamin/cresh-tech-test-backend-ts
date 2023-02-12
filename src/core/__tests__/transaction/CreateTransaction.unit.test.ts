import 'reflect-metadata';
import { UuidGateway } from './../adapters/gateways/UuidGateway';
import { CreateTransaction } from './../../usecases/transaction/CreateTransaction';
import { InMemoryInstalmentRepository } from './../adapters/repositories/InMemoryInstalmentRepository';
import { Instalment } from './../../Entities/Instalment';
import { Transaction } from './../../Entities/Transaction';
import { InMemoryTransactionRepository } from './../adapters/repositories/InMemoryTransactionRepository';
import { customerFixture } from '../../fixtures/customer';
import { SplitErrors } from '../../errors/SplitErrors';

const transactionDb = new Map<string, Transaction>()
const instalmentDb = new Map<string, Instalment>()

describe("Unit - CreateTransaction", () => {
    let inMemoryTransactionRepository: InMemoryTransactionRepository;
    let inMemoryInstalmentRepository: InMemoryInstalmentRepository;
    let uuidGateway: UuidGateway;
    let createTransaction: CreateTransaction;


    beforeAll(() => {
        inMemoryTransactionRepository = new InMemoryTransactionRepository(transactionDb)
        inMemoryInstalmentRepository = new InMemoryInstalmentRepository(instalmentDb)
        uuidGateway = new UuidGateway()
        createTransaction = new CreateTransaction(inMemoryTransactionRepository,inMemoryInstalmentRepository , uuidGateway)
    })
    it("should create a transaction", async  () => {
        const result = await createTransaction.execute({
            ammout: 1000.87,
            customer_id: customerFixture[0].props.id,
            is_online: true,
            split: 4,
            store_name: "The Store"
        })
        const instalments = Array.from(instalmentDb.values())

        expect(result.props.id).toBeTruthy()
        expect(instalments).toHaveLength(4)
        expect(instalments[0].props.id).toBeTruthy()
        expect(instalments[0].props.amount).toEqual(250.87)
        expect(instalments[0].props.transaction_id).toEqual(result.props.id)
    })

    it("should throw if split is invalid", async  () => {
        const result = createTransaction.execute({
            ammout: 512,
            customer_id: customerFixture[0].props.id,
            is_online: true,
            split: 6,
            store_name: "Amazon"
        })
        await expect(result).rejects.toThrow(SplitErrors.InvalidEntry)
    })
})