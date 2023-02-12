import { Instalment } from './../Entities/Instalment';

export interface InstalmentRepository {
    create(instalment: Instalment[]): Promise<Instalment[]>;
    getAllByTransactionId(transactionId: string): Promise<Instalment[]>;
    getById(instalmentId: string): Promise<Instalment> 
    update(instalment: Instalment): Promise<Instalment> 
  }
  