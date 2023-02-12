import 'reflect-metadata';
import { CreateCustomerCommand } from './../commands/customer/CreateCustomerCommand';
import { GetTransactionsByCustomerId } from './../../core/usecases/customer/GetTransactionsByCustomerId';
import { GetAllCustomers } from './../../core/usecases/customer/GetAllCustomers';
import { CreateCustomer } from './../../core/usecases/customer/CreateCustomer';
import { Response } from "express";
import {Body, Get, JsonController, Param, Post, Req, Res} from "routing-controllers";
import { injectable } from 'inversify';

@injectable()
@JsonController('/customers')
export class CustomerController {
    constructor(
        private readonly _createCustomer: CreateCustomer,
        private readonly _getAllCustomers: GetAllCustomers,
        private readonly _getTransactionsByCustomerId: GetTransactionsByCustomerId
    ) {}

    @Post('/')
    async create(@Res() res: Response, @Body() cmd: CreateCustomerCommand) {
       const body = CreateCustomerCommand.setProperties(cmd)
       const customer = await this._createCustomer.execute(body) 

       return res.status(201).send({
        customer
       })
    }

    @Get('/all')
    async getAll(@Res() res: Response) {
       const customers = await this._getAllCustomers.execute() 
       
       return res.status(200).send({
        customers
       })
    }

    @Get('/transactions/:customerId')
    async getTransactionsByCustommerId(@Res() res: Response,  @Param("customerId") customerId: string) {
       const transactions = await this._getTransactionsByCustomerId.execute(customerId) 

       return res.status(200).send({
        transactions 
       })
    }
}