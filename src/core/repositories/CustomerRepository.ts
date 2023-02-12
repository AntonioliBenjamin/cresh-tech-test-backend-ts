import { Customer } from "../entities/Customer";

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;
  getAllCustomers(): Promise<Customer[]>;
}
