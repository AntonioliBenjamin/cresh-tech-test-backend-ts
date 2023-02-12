import 'reflect-metadata';
import { CreateTransaction } from './../../core/usecases/transaction/CreateTransaction';
import { CreateTransactionCommand } from './../commands/transaction/CreateTransactionCommand';
import { TriggerInstalmentPayment } from './../../core/usecases/transaction/TriggerInstalmentPayment';
import { GetAllInstalmentsByTransactionId } from './../../core/usecases/transaction/GetAllInstalmentsByTransactionId';
import { injectable } from "inversify"
import { Response } from "express";
import { Body, Get, JsonController, Param, Patch, Post, Res } from "routing-controllers"

@injectable()
@JsonController('/transactions')
export class TransactionController {
    constructor(
        private readonly _createTransaction: CreateTransaction,
        private readonly _getAllInstalmentsByTransactionId: GetAllInstalmentsByTransactionId,
        private readonly _triggerInstalmentPayment: TriggerInstalmentPayment
    ) {}

    @Post('/')
    async create(@Res() res: Response, @Body() cmd: CreateTransactionCommand) {
       const body = CreateTransactionCommand.setProperties(cmd)
       const transaction = await this._createTransaction.execute(body) 

       return res.status(201).send({
        transaction
       })
    }

    @Get('/instalments/:transactionId')
    async getAll(@Res() res: Response, @Param("transactionId") transactionId: string) {
       const instalments = await this._getAllInstalmentsByTransactionId.execute(transactionId) 
       
       return res.status(200).send({
        instalments
       })
    }

    @Patch('/instalments/:instalmentId')
    async triggerInstalmentPayment(@Res() res: Response,  @Param("instalmentId") instalmentId: string) {
       const instalment = await this._triggerInstalmentPayment.execute(instalmentId) 

       return res.status(200).send({
        instalment
       })
    }
}