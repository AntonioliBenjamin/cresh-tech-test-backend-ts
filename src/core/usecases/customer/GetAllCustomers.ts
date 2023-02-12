import { Identifiers } from './../../identifiers/Identifiers';
import { injectable, inject } from 'inversify';
import { CustomerRepository } from "./../../repositories/CustomerRepository";
import { Customer } from "../../entities/Customer";
import { UseCase } from "./../UseCase";

@injectable()
export class GetAllCustomers implements UseCase<void, Customer[]> {
  constructor(
    @inject(Identifiers.customerRepository) private readonly customerRepository: CustomerRepository
    ) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepository.getAllCustomers();
  }
}
