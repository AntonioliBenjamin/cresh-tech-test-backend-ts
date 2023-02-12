import { DomainErrors } from "./DomainErrors"

export namespace BirthDateErrors {
  export class InvalidEntry extends DomainErrors {
    constructor() {
        super("INVALID_ENTRY_DATE_MUST_BE_A_STRING_dd/mm/yyyy")
    }
  }
}