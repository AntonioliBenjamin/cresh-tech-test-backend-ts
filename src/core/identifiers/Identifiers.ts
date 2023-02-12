export class Identifiers {
    //repositories
    static customerRepository = Symbol.for("CustomerRepository");
    static transactionRepository = Symbol.for("TransactionRepository");
    static instalmentRepository = Symbol.for("instalmentRepository");
    //gateways
    static IdGateway = Symbol.for("IdGateway")
}