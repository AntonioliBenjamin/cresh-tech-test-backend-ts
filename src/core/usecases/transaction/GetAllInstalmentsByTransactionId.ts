import { Identifiers } from './../../identifiers/Identifiers';
import { injectable, inject } from 'inversify';
import { InstalmentRepository } from './../../repositories/InstalmentRepository';
import { Instalment } from "../../Entities/Instalment";
import { UseCase } from "../UseCase";

@injectable()
export class GetAllInstalmentsByTransactionId implements UseCase<string, Instalment[]> {
    constructor(
        @inject(Identifiers.instalmentRepository) private readonly instalmentRepository: InstalmentRepository
    ) {}

    async execute(input: string): Promise<Instalment[]> {
        return await this.instalmentRepository.getAllByTransactionId(input)
    }
}