import 'reflect-metadata';
import { customerFixture } from './../../fixtures/customer';
import { InMemoryCustomerRepository } from "./../adapters/repositories/InMemoryCustomerRepository";
import { Customer } from "./../../Entities/Customer";
import { GetAllCustomers } from "../../usecases/customer/GetAllCustomers";


const db = new Map<string, Customer>();

describe("Unit - GetAllCustomers", () => {
  it("should get all customers", async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository(db);
    const getAllCustomers = new GetAllCustomers(inMemoryCustomerRepository);

    db.set(customerFixture[0].props.id, customerFixture[0]);
    db.set(customerFixture[1].props.id, customerFixture[1]);

    const result = await getAllCustomers.execute();
    expect(result).toHaveLength(2);
  });
});
