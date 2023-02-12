import { injectable } from 'inversify';
import { MongoDbCustomerMapper } from './../mappers/MongoDbCustomerMapper';
import { Customer } from '../../../core/Entities/Customer';
import { CustomerRepository } from './../../../core/repositories/CustomerRepository';
import { customerModel } from '../models/customer';

const mongoDbCustomerMapper = new MongoDbCustomerMapper()

@injectable()
export class MongoDbCustomerRepository implements CustomerRepository {
    async create(customer: Customer): Promise<Customer> {
        const toCustomerModel = mongoDbCustomerMapper.fromDomain(customer)
        const model = new customerModel(toCustomerModel)
        await model.save()
        return customer
    }

    async getAllCustomers(): Promise<Customer[]> {
      const customers = await customerModel.find({});
      return customers.map(elm => mongoDbCustomerMapper.toDomain(elm))
    }

}