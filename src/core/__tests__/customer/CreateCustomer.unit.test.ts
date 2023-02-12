import 'reflect-metadata';
import { UuidGateway } from './../adapters/gateways/UuidGateway';
import { CreateCustomer } from './../../usecases/customer/CreateCustomer';
import { Customer } from '../../entities/Customer';
import { InMemoryCustomerRepository } from '../adapters/repositories/InMemoryCustomerRepository';
import { BirthDateErrors } from '../../errors/BirthDateErrors';

const db = new Map<string, Customer>();

describe("Unit - CreateCustomer", () => {
    it("should create a customer", async () => {
        const inMemoryCustomerRepository = new InMemoryCustomerRepository(db);
        const uuidGateway = new UuidGateway()
        const createCustomer = new CreateCustomer(inMemoryCustomerRepository, uuidGateway);

        const result = await createCustomer.execute({
            firstname: "John",
            lastname: "Doe",
            birthdate: "12/05/1985"
        })
        expect(result.props.id).toBeTruthy()
    })

    it("should throw if birthdate is invalid", async () => {
        const inMemoryCustomerRepository = new InMemoryCustomerRepository(db);
        const uuidGateway = new UuidGateway()
        const createCustomer = new CreateCustomer(inMemoryCustomerRepository, uuidGateway);

        const result = createCustomer.execute({
            firstname: "John",
            lastname: "Doe",
            birthdate: "may 12, 2023"
        })
        await expect(result).rejects.toThrow(BirthDateErrors.InvalidEntry)
    })
})