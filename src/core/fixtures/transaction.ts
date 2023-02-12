import { Transaction } from "../Entities/Transaction"

const transaction1 = new Transaction({
    id: "2",
    amount: 1000,
    customer_id: "1",
    is_completed: false,
    is_online: true,
    split: 3,
    store_name: "Apple",
    created_at: new Date()
})

const transaction2 = new Transaction({
    id: "1",
    amount: 500,
    customer_id: "1",
    is_completed: false,
    is_online: true,
    split: 4,
    store_name: "Nike",
    created_at: new Date()
})

const transaction3 = new Transaction({
    id: "3",
    amount: 5100,
    customer_id: "3",
    is_completed: false,
    is_online: false,
    split: 4,
    store_name: "BMW",
    created_at: new Date()
})

export const transactionFixture = [
    transaction1,
    transaction2,
    transaction3
]