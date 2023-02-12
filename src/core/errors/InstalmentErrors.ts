import { DomainErrors } from "./DomainErrors"

export namespace InstalmentErrors {
  export class NotFound extends DomainErrors {
    constructor() {
        super("INSTALMENT_NOT_FOUND")
    }
  }
}