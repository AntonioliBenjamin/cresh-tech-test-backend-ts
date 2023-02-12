import { Transaction } from "./../Entities/Transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction>
  getTransactionsByCustomerId(customerId: string): Promise<Transaction[]>;
  getById(transactionId: string): Promise<Transaction>;
  update(transaction: Transaction): Promise<Transaction>;
}
