import { Request, Response } from "express";
import routes from "../../routes/orderRoute";
import { asyncHandler } from "../../helpers/asyncHandler";
import BuildResponse from "../../modules/Response/BuildResponse";
import QuestionnaireService from "./service";

routes.get(
  "/questionnaire",
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await QuestionnaireService.getAll(req);

    const buildResponse = BuildResponse.get({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.post(
  "/questionnaire",
  // Authorization,
  asyncHandler(async function AddQuestions(req: Request, res: Response) {
    const payload = req.getBody();
    const txn = await req.getTransaction();

    const data = await QuestionnaireService.create(payload, txn);
    await txn.commit();


    const buildResponse = BuildResponse.created({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.put(
  "/questionnaire",
  // Authorization,
  asyncHandler(async function updateQuestion(req: Request, res: Response) {
    const payload = req.getBody();
    const txn = await req.getTransaction();

    const data = await QuestionnaireService.update(payload, txn);
    await txn.commit();
    const buildResponse = BuildResponse.updated({ data });
    return res.status(201).json(buildResponse);
  })
);

routes.delete(
  "/questionnaire/:q_id",
  // Authorization,
  asyncHandler(async function removeQuestion(req: Request, res: Response) {
    const params = req.getParams();
    const data = await QuestionnaireService.delete(params.defect_id);

    const buildResponse = BuildResponse.deleted({ data });
    return res.status(201).json(buildResponse);
  })
);
