import { Transaction } from './../../../core/Entities/Transaction';
import { TransactionModel } from './../models/transaction';
import { Mapper } from './../../../core/models/Mapper';

export class MongoDbTransactionMapper implements Mapper<TransactionModel, Transaction> {
    toDomain(raw: TransactionModel): Transaction {
     return new Transaction({
       id: raw.id,
       customer_id: raw.customer_id,
       amount: raw.amount,
       is_completed: raw.is_completed,
       is_online: raw.is_online,
       split: raw.split,
       store_name: raw.store_name,
       created_at: new Date(raw.created_at)
     })
    }
    fromDomain(data: Transaction): TransactionModel {
        return ({
            id: data.props.id,
            customer_id: data.props.customer_id,
            amount: data.props.amount,
            is_completed: data.props.is_completed,
            is_online: data.props.is_online,
            split: data.props.split,
            store_name: data.props.store_name,
            created_at: +data.props.created_at
          })
    }
}