import { Request, Response } from "express";
import routes from "../../routes/orderRoute";
import { asyncHandler } from "../../helpers/asyncHandler";
import BuildResponse from "../../modules/Response/BuildResponse";
import OrderService from "./service";
import models from "../../models";

const { OrderDefects } = models; // don't remove this line

routes.get(
  "/defect",
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await OrderService.getAll(req);

    const buildResponse = BuildResponse.get({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.get(
  "/defect/:defect_id",
  // Authorization,
  asyncHandler(async function getById(req: Request, res: Response) {
    const params = req.getParams()
    const data = await OrderService.getById(req, params.defect_id);

    const buildResponse = BuildResponse.get({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.get(
  "/defect/offers/:defect_id",
  // Authorization,
  asyncHandler(async function getOfferByDefectId(req: Request, res: Response) {
    const params = req.getParams();
    const data = await OrderService.getOfferByDefectId(req, params.defect_id);

    const buildResponse = BuildResponse.get({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.post(
  "/defect",
  // Authorization,
  asyncHandler(async function addNewDefect(req: Request, res: Response) {
    const payload = req.getBody();
    const data = await OrderService.create(payload);

    const buildResponse = BuildResponse.created({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.put(
  "/defect/:defect_id",
  // Authorization,
  asyncHandler(async function removeDefect(req: Request, res: Response) {
    const payload = req.getBody();
    const params = req.getParams();
    const data = await OrderService.update(params.defect_id, payload);

    const buildResponse = BuildResponse.updated({ data });
    return res.status(201).json(buildResponse);
  })
);
routes.delete(
  "/defect/:defect_id",
  // Authorization,
  asyncHandler(async function removeDefect(req: Request, res: Response) {
    const params = req.getParams();
    const data = await OrderService.delete(params.defect_id);

    const buildResponse = BuildResponse.deleted({ data });
    return res.status(201).json(buildResponse);
  })
);


routes.post(
  "/defect/offer/accept",
  // Authorization,
  asyncHandler(async function acceptOffer(req: Request, res: Response) {
    const txn = await req.getTransaction()
    const data = await OrderService.acceptOffer(req);
    await txn.commit()
    const buildResponse = BuildResponse.created({ data });
    return res.status(201).json(buildResponse);
  })
);


routes.post(
  "/defect/offer/reject",
  // Authorization,
  asyncHandler(async function rejectOffer(req: Request, res: Response) {
    const txn = await req.getTransaction()
    const data = await OrderService.rejectOffer(req);
    await txn.commit()
    const buildResponse = BuildResponse.created({ data });
    return res.status(201).json(buildResponse);
  })
);
