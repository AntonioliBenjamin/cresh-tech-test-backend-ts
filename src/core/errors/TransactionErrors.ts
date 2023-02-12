import { DomainErrors } from "./DomainErrors"

export namespace TransactionErrors {
  export class NotFound extends DomainErrors {
    constructor() {
        super("TRANSACTION_NOT_FOUND")
    }
  }
}