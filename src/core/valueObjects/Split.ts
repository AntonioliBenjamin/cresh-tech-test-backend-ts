import { SplitErrors } from "../errors/SplitErrors";

export class Split {
  
    static isValid(split): boolean {
      if(split !== 3 && split !== 4) {
        throw new SplitErrors.InvalidEntry()
      }
      return true
    }
  }