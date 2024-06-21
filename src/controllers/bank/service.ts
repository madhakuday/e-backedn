import { Request } from "express";
import useValidation from "../../helpers/useValidation";
import schema from "./schema";
import PluginSqlizeQuery from "../../modules/SqlizeQuery/PluginSqlizeQuery";
import Bank from "../../models/bank";
import { Op, Transaction, where } from "sequelize/types";

class BankService {
 
  public static async create(req: Request, txn: Transaction) {
    let formData = req.getBody()
    const value = useValidation(schema.create, formData);
    
    const data = await Bank.create(value, {
      transaction: txn,
    })

    return data
  }
}

export default BankService;
