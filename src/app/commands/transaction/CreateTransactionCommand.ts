import { Expose, plainToClass } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateTransactionCommand {
    @Expose()
    @IsNumber()
    ammout: number;

    @Expose()
    @IsString()
    customer_id: string;

    @Expose()
    @IsBoolean()
    is_online: boolean;

    @Expose()
    @IsNumber()
    split: number;

    @Expose()
    @IsString()
    store_name: string;

    static setProperties(cmd: CreateTransactionCommand): CreateTransactionCommand {
        return plainToClass(CreateTransactionCommand, cmd, {excludeExtraneousValues: true});
    }
}