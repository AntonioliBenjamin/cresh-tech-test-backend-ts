import 'reflect-metadata';
import { TriggerInstalmentPayment } from './../../usecases/transaction/TriggerInstalmentPayment';
import { InMemoryInstalmentRepository } from './../adapters/repositories/InMemoryInstalmentRepository';
import { InMemoryTransactionRepository } from './../adapters/repositories/InMemoryTransactionRepository';
import { Transaction } from './../../Entities/Transaction';
import { Instalment } from './../../Entities/Instalment';
import { instalmentFixtures } from '../../fixtures/instalment';
import { transactionFixture } from '../../fixtures/transaction';

const instalmentDb = new Map<string, Instalment>()
const transactionDb = new Map<string, Transaction>()

describe("Unit - TriggerInstalmentPayment", () => {
    let inMemoryTransactionRepository: InMemoryTransactionRepository;
    let inMemoryInstalmentRepository: InMemoryInstalmentRepository;
    let triggerInstalmentPayment: TriggerInstalmentPayment

    beforeAll(() => {
        inMemoryTransactionRepository = new InMemoryTransactionRepository(transactionDb)
        inMemoryInstalmentRepository = new InMemoryInstalmentRepository(instalmentDb)
        triggerInstalmentPayment = new TriggerInstalmentPayment(inMemoryInstalmentRepository, inMemoryTransactionRepository)

        instalmentFixtures.map(elm => instalmentDb.set(elm.props.id, elm))
        transactionDb.set(transactionFixture[1].props.id, transactionFixture[1])
    })

    it("should trigger the instalment payment", async () => {
        const result = await triggerInstalmentPayment.execute(instalmentFixtures[0].props.id)
        expect(result.props.is_paid).toBeTruthy()
    })

    it("shoul update is_completed in transaction if is_last instalment", async () => {
        await triggerInstalmentPayment.execute(instalmentFixtures[2].props.id)
        expect(transactionDb.get(instalmentFixtures[2].props.transaction_id).props.is_completed).toBeTruthy()
    })
})