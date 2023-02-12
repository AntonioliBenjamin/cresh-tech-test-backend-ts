import { Identifiers } from './../../identifiers/Identifiers';
import { injectable, inject } from 'inversify';
import { InstalmentRepository } from './../../repositories/InstalmentRepository';
import { Instalment } from './../../Entities/Instalment';
import { IdGateway } from './../../gateways/IdGateway';
import { TransactionRepository } from './../../repositories/TransactionRepository';
import { Transaction } from './../../Entities/Transaction';
import { UseCase } from "../UseCase";

export type CreateTransactionInput = {
    customer_id: string;
    split: number;
    ammout: number;
    store_name: string;
    is_online: boolean
}

@injectable()
export class CreateTransaction implements UseCase<CreateTransactionInput, Transaction> {
    constructor(
        @inject(Identifiers.transactionRepository) private readonly transactionRepository: TransactionRepository,
        @inject(Identifiers.instalmentRepository) private readonly instalmentRepository: InstalmentRepository,
        @inject(Identifiers.IdGateway) private readonly idGateway: IdGateway
    ) {}

    async execute(input: CreateTransactionInput): Promise<Transaction> {
        const id = this.idGateway.generate()

        const transaction = Transaction.create({
            id: id,
            customer_id: input.customer_id,
            amount: input.ammout,
            split: input.split,
            store_name: input.store_name,
            is_online: input.is_online,
        })

        const instalments = Instalment.splitInstalment({
            split: input.split,
            amount: input.ammout,
            transaction_id: transaction.props.id
        })

        await this.instalmentRepository.create(instalments)
        return await this.transactionRepository.create(transaction)
    }
}