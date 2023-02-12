import 'reflect-metadata';
import { InMemoryTransactionRepository } from '../adapters/repositories/InMemoryTransactionRepository';
import { Transaction } from '../../Entities/Transaction';
import { GetTransactionsByCustomerId } from '../../usecases/customer/GetTransactionsByCustomerId';
import { transactionFixture } from '../../fixtures/transaction';

const db = new Map<string, Transaction>()

describe("Unit - GetTransactionsByCustomerId", () => {

    it("shoul get transactions by customer id", async () => {
        const inMemoryTransactionRepository = new InMemoryTransactionRepository(db)
        const getTransactionsByCustomerId = new GetTransactionsByCustomerId(inMemoryTransactionRepository)

        db.set(transactionFixture[0].props.id, transactionFixture[0]);
        db.set(transactionFixture[1].props.id, transactionFixture[1]);

        const result = await getTransactionsByCustomerId.execute("1")
        expect(result).toHaveLength(2)
    })
})