import { Transaction } from "../../../Entities/Transaction";
import { TransactionRepository } from "./../../../repositories/TransactionRepository";

export class InMemoryTransactionRepository implements TransactionRepository {
  constructor(private readonly db: Map<string, Transaction>) {}

  async getById(transactionId: string): Promise<Transaction> {
    return this.db.get(transactionId)
  }
  
  async update(transaction: Transaction): Promise<Transaction> {
    this.db.set(transaction.props.id, transaction)
    return transaction
  }

  async create(transaction: Transaction): Promise<Transaction> {
    this.db.set(transaction.props.id, transaction)
    return transaction
  }

  async getTransactionsByCustomerId(customerId: string): Promise<Transaction[]> {
    const values = Array.from(this.db.values());
    return await values.filter(elm => elm.props.customer_id === customerId)
  }
}
