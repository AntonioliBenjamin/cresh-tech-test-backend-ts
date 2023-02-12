import { injectable } from 'inversify';
import { MongoDbInstalmentMapper } from "./../mappers/MongoDbInstalmentMapper";
import { Instalment } from "../../../core/Entities/Instalment";
import { InstalmentRepository } from "../../../core/repositories/InstalmentRepository";
import { instalmentModel } from "../models/instalment";
import { InstalmentErrors } from "../../../core/errors/InstalmentErrors";

const mongoDbInstalmentMapper = new MongoDbInstalmentMapper();

@injectable()
export class MongoDbInstalmentRepository implements InstalmentRepository {
  async create(instalment: Instalment[]): Promise<Instalment[]> {
    const toInstalmentModel = instalment.map((elm) =>
      mongoDbInstalmentMapper.fromDomain(elm)
    );
    const models = toInstalmentModel.map((elm) => new instalmentModel(elm));
    await instalmentModel.insertMany(models);
    return instalment;
  }

  async getAllByTransactionId(transactionId: string): Promise<Instalment[]> {
    const instalments = await instalmentModel.find({
      transaction_id: transactionId,
    });
    if(instalments.length === 0) {
      throw new InstalmentErrors.NotFound()
    }
    return instalments.map((elm) => mongoDbInstalmentMapper.toDomain(elm));
  }

  async getById(instalmentId: string): Promise<Instalment> {
    const instalment = await instalmentModel.findOne({
      id: instalmentId,
    });

    if(!instalment) {
      throw new InstalmentErrors.NotFound()
    }
    return mongoDbInstalmentMapper.toDomain(instalment);
  }

  async update(instalment: Instalment): Promise<Instalment> {
    const toInstalmentModel = mongoDbInstalmentMapper.fromDomain(instalment)

    await instalmentModel.findOneAndUpdate(
      { id : instalment.props.id },
      {
        $set: {
            is_paid: toInstalmentModel.is_paid
        },
      }
    );
    return instalment;
  }
}
