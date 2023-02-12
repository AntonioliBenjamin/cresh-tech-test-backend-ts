import { Customer } from "../entities/Customer";

const customer1 = new Customer({
    id: "12345",
    birthdate: new Date(),
    firstname: "John",
    lastname: "Doe",
    createdAt: new Date()
  });

  const customer2 = new Customer({
    id: "98765",
    birthdate: new Date(),
    firstname: "Foo",
    lastname: "Bar",
    createdAt: new Date()
  });

export const customerFixture = [
    customer1,
    customer2,
]