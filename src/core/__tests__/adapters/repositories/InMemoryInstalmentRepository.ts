import { Instalment } from '../../../Entities/Instalment';
import { InstalmentRepository } from './../../../repositories/InstalmentRepository';

export class InMemoryInstalmentRepository implements InstalmentRepository {
    constructor(private readonly db: Map<string, Instalment>) {}

    async getById(instalmentId: string): Promise<Instalment> {
        return this.db.get(instalmentId)
    }

    async update(instalment: Instalment): Promise<Instalment> {
       this.db.set(instalment.props.id, instalment);
       return instalment
    }

    async create(instalments: Instalment[]): Promise<Instalment[]> {
        instalments.map(elm => this.db.set(elm.props.id, elm)) 
        return instalments
    }

    async getAllByTransactionId(transactionId: string): Promise<Instalment[]> {
        const values = Array.from(this.db.values())
        return values.filter(elm => elm.props.transaction_id === transactionId)
    }
}