import { Request, Response } from "express";
import routes from "../../routes/orderRoute";
import { asyncHandler } from "../../helpers/asyncHandler";
import BuildResponse from "../../modules/Response/BuildResponse";
import BankService from "./service";


routes.post(
  "/bank",
  // Authorization,
  asyncHandler(async function AddOrderStep(req: Request, res: Response) {
    const txn = await req.getTransaction();

    const data = await BankService.create(req, txn);
    await txn.commit();


    const buildResponse = BuildResponse.created({ data });
    return res.status(201).json(buildResponse);
  })
);

