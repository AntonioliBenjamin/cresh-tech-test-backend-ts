import { DomainErrors } from "./DomainErrors"

export namespace SplitErrors {
  export class InvalidEntry extends DomainErrors {
    constructor() {
        super("INVALID_ENTRY_SPLIT_MUST_BE_3_OR_4")
    }
  }
}