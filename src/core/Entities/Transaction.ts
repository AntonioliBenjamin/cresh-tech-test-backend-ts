export type TransactionProperties = {
  id: string;
  customer_id: string;
  store_name: string;
  amount: number;
  split: number;
  is_online: boolean;
  is_completed: boolean;
  created_at: Date
};

export class Transaction {
  props: TransactionProperties;

  constructor(props: TransactionProperties) {
    this.props = props;
  }

  static create(props: {
    id: string;
    customer_id: string;
    store_name: string;
    amount: number;
    split: number;
    is_online: boolean;
  }) {
    return new Transaction({
      id: props.id,
      customer_id: props.customer_id,
      store_name: props.store_name,
      amount: props.amount,
      split: props.split,
      is_online: props.is_online,
      is_completed: false,
      created_at: new Date()
    });
  }

  complete() {
    this.props.is_completed = true
  };
}
