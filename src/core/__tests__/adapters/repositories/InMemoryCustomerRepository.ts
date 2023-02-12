import { Customer } from "../../../entities/Customer";
import { CustomerRepository } from "../../../repositories/CustomerRepository";

export class InMemoryCustomerRepository implements CustomerRepository {
  constructor(private readonly db: Map<string, Customer>) {}

  async create(customer: Customer): Promise<Customer> {
    this.db.set(customer.props.id, customer);
    return customer;
  }

  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.db.values());
  }
}
