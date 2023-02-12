import { Expose, plainToClass } from "class-transformer";
import { IsString } from "class-validator";

export class CreateCustomerCommand {
    @Expose()
    @IsString()
    firstname: string;

    @Expose()
    @IsString()
    lastname: string;

    @Expose()
    @IsString()
    birthdate: string;

    static setProperties(cmd: CreateCustomerCommand): CreateCustomerCommand {
        return plainToClass(CreateCustomerCommand, cmd, {excludeExtraneousValues: true});
    }
}