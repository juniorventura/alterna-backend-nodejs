import { AlternaErrorEnum } from "../enums/error.enum";

export class CustomError extends Error {
    name: AlternaErrorEnum;
    message: string;

    constructor({name, message}: {name: AlternaErrorEnum, message: string}) {
        super();
        this.name = name;
        this.message = message;
    }
}