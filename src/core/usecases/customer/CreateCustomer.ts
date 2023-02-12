import { Identifiers } from './../../identifiers/Identifiers';
import { injectable, inject } from 'inversify';
import { CustomerRepository } from "./../../repositories/CustomerRepository";
import { Customer } from "./../../Entities/Customer";
import { UseCase } from "./../UseCase";
import { IdGateway } from "../../gateways/IdGateway";

export type CreateCustomerInput = {
  firstname: string;
  lastname: string;
  birthdate: string;
};

@injectable()
export class CreateCustomer implements UseCase<CreateCustomerInput, Customer> {
  constructor(
    @inject(Identifiers.customerRepository) private readonly customerRepository: CustomerRepository,
    @inject(Identifiers.IdGateway) private readonly idGateway: IdGateway
  ) {}

  async execute(input: CreateCustomerInput): Promise<Customer> {
    const id = this.idGateway.generate();

    const customer = Customer.create({
      id: id,
      firstname: input.firstname,
      lastname: input.lastname,
      birthdate: input.birthdate
    });

    await this.customerRepository.create(customer)

    return customer;
  }
}
