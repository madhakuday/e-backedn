import { Request, Response } from "express";
import routes from "../../routes/orderRoute";
import { asyncHandler } from "../../helpers/asyncHandler";
import BuildResponse from "../../modules/Response/BuildResponse";
import OrderStepService from "./service";

routes.get(
  "/od_step",
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await OrderStepService.getAll(req);

    const buildResponse = BuildResponse.get({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.get(
  "/image-preview/:od_id",
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const params = req.getParams()
    const data = await OrderStepService.getPreviewList(params.od_id);

    const buildResponse = BuildResponse.get({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.post(
  "/od_step",
  // Authorization,
  asyncHandler(async function AddOrderStep(req: Request, res: Response) {
    const payload = req.getBody();
    const txn = await req.getTransaction();

    const data = await OrderStepService.create(payload, txn);
    await txn.commit();


    const buildResponse = BuildResponse.created({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.put(
  "/od_step",
  // Authorization,
  asyncHandler(async function updateOrderStep(req: Request, res: Response) {
    const payload = req.getBody();
    const txn = await req.getTransaction();

    const data = await OrderStepService.update(payload, txn);
    await txn.commit();
    const buildResponse = BuildResponse.updated({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.delete(
  "/od_step/:s_id",
  // Authorization,
  asyncHandler(async function removeOrderStep(req: Request, res: Response) {
    const params = req.getParams();
    const data = await OrderStepService.delete(params.s_id);

    const buildResponse = BuildResponse.deleted({ data });
    return res.status(201).json(buildResponse);
  })
);
