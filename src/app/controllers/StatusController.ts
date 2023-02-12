import "reflect-metadata";
import { injectable } from "inversify";
import { Response } from "express";
import { Get, JsonController, Res } from "routing-controllers";
import mongoose from "mongoose";

@injectable()
@JsonController("/status")
export class statusController {
    
  @Get("/")
  async status(@Res() res: Response) {
    await mongoose.connection.db.admin().ping();
    return res.sendStatus(200);
  }
}
