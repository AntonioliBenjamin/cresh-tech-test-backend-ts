import 'reflect-metadata';
import { Instalment } from "../../Entities/Instalment"
import { instalmentFixtures } from "../../fixtures/instalment"
import { GetAllInstalmentsByTransactionId } from "../../usecases/transaction/GetAllInstalmentsByTransactionId"
import { InMemoryInstalmentRepository } from "../adapters/repositories/InMemoryInstalmentRepository"

const instalmentDb = new Map<string, Instalment>()

describe("Unit - GetAllInstalmentsByTransactionId", () => {

    it("should get all instalments by transaction id", async () => {
       const inMemoryInstalmentRepository = new InMemoryInstalmentRepository(instalmentDb)
       const getAllInstalmentsByTransactionId = new GetAllInstalmentsByTransactionId(inMemoryInstalmentRepository)
       
       instalmentFixtures.map(elm => instalmentDb.set(elm.props.id, elm))

       const result = await getAllInstalmentsByTransactionId.execute(instalmentFixtures[0].props.transaction_id)
       expect(result).toHaveLength(3)
    })
})