import { v4 } from 'uuid';
import { Split } from '../valueObjects/Split';

export type InstalmentProperties = {
  id: string;
  transaction_id: string;
  amount: number;
  is_paid: boolean;
  planned_date: Date;
  paid_date: Date;
  is_last: boolean
};

export class Instalment {
  props: InstalmentProperties;

  constructor(props: InstalmentProperties) {
    this.props = props;
  }

  static create(props: {
    transaction_id: string;
    amount: number;
    is_paid: boolean;
    planned_date: Date;
    paid_date: Date;
    is_last: boolean
  }) {
    return new Instalment({
      id: v4(),
      transaction_id: props.transaction_id,
      amount: props.amount,
      is_paid: props.is_paid,
      planned_date: props.planned_date,
      paid_date: props.paid_date,
      is_last: props.is_last
    });
  }

  static splitInstalment(payload: { split: number, amount: number, transaction_id: string }): Instalment[] {
    Split.isValid(payload.split)
    let plannedDate = new Date();

    const instalments = Array(payload.split)
      .fill(0)
      .map((_, i) => {
        const amount = i === 0 ? 
          Math.floor(payload.amount / payload.split) + (payload.amount % payload.split) :
          Math.floor(payload.amount / payload.split);
          
        const instalment = Instalment.create({
          transaction_id: payload.transaction_id,
          amount,
          is_paid: i === 0,
          planned_date: i === 0 ? new Date() : new Date(plannedDate.setMonth(plannedDate.getMonth() + 1)),
          paid_date: i === 0 ? new Date() : null,
          is_last: i === payload.split - 1
        });

        return instalment;
      });

    return instalments;
  }

  pay() {
    this.props.is_paid = true,
    this.props.paid_date = new Date()
  }

}
