import { Identifiers } from './../../identifiers/Identifiers';
import { injectable,inject } from 'inversify';
import { TransactionRepository } from './../../repositories/TransactionRepository';
import { InstalmentRepository } from './../../repositories/InstalmentRepository';
import { Instalment } from './../../Entities/Instalment';
import { UseCase } from './../UseCase';

@injectable()
export class TriggerInstalmentPayment implements UseCase<string, Instalment> {
    constructor(
        @inject(Identifiers.instalmentRepository) private readonly instalmentRepository: InstalmentRepository,
        @inject(Identifiers.transactionRepository) private readonly transactionRepository: TransactionRepository
    ) {}

    async execute(input: string): Promise<Instalment> {
        const instalment = await this.instalmentRepository.getById(input)
        instalment.pay()

        if(instalment.props.is_last) {
            const transaction = await this.transactionRepository.getById(instalment.props.transaction_id)
            transaction.complete()
            await this.transactionRepository.update(transaction)
        }

        await this.instalmentRepository.update(instalment)
        return instalment;
    }

}