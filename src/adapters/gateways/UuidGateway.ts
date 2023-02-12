import {v4} from "uuid";
import {IdGateway} from "../../core/gateways/IdGateway";

export class UuidGateway implements IdGateway {
    generate(): string {
        return v4();
    }
}