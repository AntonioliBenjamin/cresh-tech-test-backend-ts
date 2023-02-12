import { Instalment } from "./../Entities/Instalment";

const instalment1 = new Instalment({
  amount: 500,
  id: "1",
  is_last: false,
  is_paid: false,
  paid_date: new Date(),
  planned_date: new Date(),
  transaction_id: "1",
});

const instalment2 = new Instalment({
  amount: 600.8,
  id: "2",
  is_last: false,
  is_paid: false,
  paid_date: new Date(),
  planned_date: new Date(),
  transaction_id: "1",
});

const instalment3 = new Instalment({
  amount: 78.5,
  id: "3",
  is_last: true,
  is_paid: false,
  paid_date: new Date(),
  planned_date: new Date(),
  transaction_id: "1",
});

export const instalmentFixtures = [
    instalment1,
    instalment2,
    instalment3
]