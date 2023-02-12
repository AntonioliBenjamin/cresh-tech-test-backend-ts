import { Mapper } from './../../../core/models/Mapper';
import { Customer } from './../../../core/Entities/Customer';
import { CustomerModel } from './../models/customer';

export class MongoDbCustomerMapper implements Mapper<CustomerModel, Customer> {
    toDomain(raw: CustomerModel): Customer {
        return new Customer({
            id: raw.id,
            birthdate: new Date(raw.birthdate),
            createdAt: new Date(raw.createdAt),
            firstname: raw.firstname,
            lastname: raw.lastname
        })
    }

    fromDomain(data: Customer): CustomerModel {
        return {
            id: data.props.id,
            birthdate: +data.props.birthdate,
            createdAt: +data.props.createdAt,
            firstname: data.props.firstname,
            lastname: data.props.firstname
        }
    }
}