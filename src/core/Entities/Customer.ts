import { BirthDate } from "../valueObjects/BirthDate";

export type CustomerProperties = {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  createdAt: Date;
};

export class Customer {
  props: CustomerProperties;

  constructor(props: CustomerProperties) {
    this.props = props;
  }

  static create(props: {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: string;
  }) {
    return new Customer({
      id: props.id,
      firstname: props.firstname,
      lastname: props.lastname,
      birthdate: BirthDate.stringToDate(props.birthdate) ,
      createdAt: new Date()
    });
  }
}
