import { injectable } from 'inversify';
import { MongoDbTransactionMapper } from './../mappers/MongoDbTransactionMapper';
import { Transaction } from '../../../core/Entities/Transaction';
import { TransactionRepository } from './../../../core/repositories/TransactionRepository';
import { transactionModel } from '../models/transaction';
import { TransactionErrors } from '../../../core/errors/TransactionErrors';

const mongoDbTransactionMapper = new MongoDbTransactionMapper()

@injectable()
export class MongoDbTransactionRepository implements TransactionRepository {
    async create(transaction: Transaction): Promise<Transaction> {
      const toTransactionModel = mongoDbTransactionMapper.fromDomain(transaction)
      const model = new transactionModel(toTransactionModel) 
      await model.save()
      return transaction;
    }

    async getTransactionsByCustomerId(customerId: string): Promise<Transaction[]> {
        const transactions = await transactionModel.find({
           customer_id : customerId,
          });
          if(transactions.length === 0) {
            throw new TransactionErrors.NotFound()
          }

          return transactions.map(elm => mongoDbTransactionMapper.toDomain(elm));
    }

    async getById(transactionId: string): Promise<Transaction> {
        const transaction = await transactionModel.findOne({
            id : transactionId,
          });
          if(!transaction) {
            throw new TransactionErrors.NotFound()
          }
          return mongoDbTransactionMapper.toDomain(transaction);
    }

    async update(transaction: Transaction): Promise<Transaction> {
        const toTransactionModel = mongoDbTransactionMapper.fromDomain(transaction)
    
        await transactionModel.findOneAndUpdate(
            { id : transaction.props.id },
            {
              $set: {
                 is_completed : toTransactionModel.is_completed
              },
            }
          );
          return transaction;
    }

}