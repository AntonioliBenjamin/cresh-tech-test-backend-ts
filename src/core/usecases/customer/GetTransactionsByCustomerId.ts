import { Identifiers } from './../../identifiers/Identifiers';
import { injectable, inject } from 'inversify';
import { Transaction } from '../../Entities/Transaction';
import { UseCase } from '../UseCase';
import { TransactionRepository } from '../../repositories/TransactionRepository';

@injectable()
export class GetTransactionsByCustomerId implements UseCase<string, Transaction[]> {
    constructor(
         @inject(Identifiers.transactionRepository) private readonly transactionRepository : TransactionRepository
    ) {}

    async execute(customerId: string): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByCustomerId(customerId)
    }
    
}