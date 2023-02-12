import { InstalmentModel } from './../models/instalment';
import { Instalment } from './../../../core/Entities/Instalment';
import { Mapper } from './../../../core/models/Mapper';

export class MongoDbInstalmentMapper implements Mapper<InstalmentModel, Instalment> {
    toDomain(raw: InstalmentModel): Instalment {
     return new Instalment({
        id: raw.id,
        amount: raw.amount,
        is_last: raw.is_last,
        is_paid: raw.is_paid,
        paid_date: new Date(raw.paid_date),
        planned_date: new Date(raw.paid_date),
        transaction_id: raw.transaction_id
     })
    }
    fromDomain(data: Instalment): InstalmentModel {
        return ({
            id: data.props.id,
            amount: data.props.amount,
            is_last: data.props.is_last,
            is_paid: data.props.is_paid,
            paid_date: +data.props.paid_date,
            planned_date: +data.props.paid_date,
            transaction_id: data.props.transaction_id
         })
    }
}