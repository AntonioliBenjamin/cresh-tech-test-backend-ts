import "dotenv/config";
import { statusController } from './../controllers/StatusController';
import { TransactionController } from './../controllers/TransactionController';
import { CustomerController } from './../controllers/CustomerController';
import { TriggerInstalmentPayment } from './../../core/usecases/transaction/TriggerInstalmentPayment';
import { GetAllInstalmentsByTransactionId } from './../../core/usecases/transaction/GetAllInstalmentsByTransactionId';
import { CreateTransaction } from './../../core/usecases/transaction/CreateTransaction';
import { GetTransactionsByCustomerId } from './../../core/usecases/customer/GetTransactionsByCustomerId';
import { GetAllCustomers } from './../../core/usecases/customer/GetAllCustomers';
import { CreateCustomer } from './../../core/usecases/customer/CreateCustomer';
import { UuidGateway } from './../../core/__tests__/adapters/gateways/UuidGateway';
import { MongoDbTransactionRepository } from './../../adapters/repositories/repositories/MongoDbTransactionRepository';
import { MongoDbInstalmentRepository } from './../../adapters/repositories/repositories/MongoDbInstalmentRepository';
import { MongoDbCustomerRepository } from './../../adapters/repositories/repositories/MongoDbCustomerRepository';
import { Identifiers } from './../../core/identifiers/Identifiers';
import {Container} from "inversify";


export class Kernel extends Container {
    init() {
        //repositories
        this.bind(Identifiers.customerRepository).toConstantValue(new MongoDbCustomerRepository());
        this.bind(Identifiers.instalmentRepository).toConstantValue(new MongoDbInstalmentRepository());
        this.bind(Identifiers.transactionRepository).toConstantValue(new MongoDbTransactionRepository());

        //gateways
        this.bind(Identifiers.IdGateway).toConstantValue(new UuidGateway());

        //usecases customer
        this.bind(CreateCustomer).toSelf();
        this.bind(GetAllCustomers).toSelf();
        this.bind(GetTransactionsByCustomerId).toSelf();

        //usecases transaction
        this.bind(CreateTransaction).toSelf();
        this.bind(GetAllInstalmentsByTransactionId).toSelf();
        this.bind(TriggerInstalmentPayment).toSelf();

        //controller
        this.bind(CustomerController).toSelf();
        this.bind(TransactionController).toSelf();
        this.bind(statusController).toSelf();
    }
}