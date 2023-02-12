import { BirthDateErrors } from "../errors/BirthDateErrors";

export class BirthDate {
    static isValid(date: string): boolean {
        const dateParts = date.split("/");
        if (dateParts.length !== 3) {
          return false;
        }
        return true
    }

    static stringToDate(date: string): Date {
      if(!this.isValid(date)) {
        throw new BirthDateErrors.InvalidEntry()
      } 
      const dateParts = date.split("/");
      return new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[0])
      );
    }
  }