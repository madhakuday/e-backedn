import { Request, Response } from "express";
import useValidation from "../../helpers/useValidation";
import schema from "./schema";
import OrderDefects from "../../models/order_defect";
import PluginSqlizeQuery from "../../modules/SqlizeQuery/PluginSqlizeQuery";
import OdSteps from "../../models/od_step";
import OdQuestionnaires from "../../models/od_questionnaires";
import externalApi from "../../helpers/externalAPI"
import { currentToken } from '../../helpers/token'

class OrderService {
  public static async getAll(req: Request) {
    const { filtered = [{ id: "od_status", value: "0", op: "ne" }] } =
      req.query;
    req.query.filtered = filtered;
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req.query,
      {
        model: OrderDefects,
        order: [["created_at", "ASC"]],
      },
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [
        OdSteps,
        OdQuestionnaires
      ])
    );


    const total = await OrderDefects.count({
      where: queryFind.where,
    });

    const data = await OrderDefects.findAll({
      ...queryFind,
    });
    const getToken = currentToken(req);
    const MASTER_BACKED_URL = process.env.MASTER_BACKED_URL;
    const dataWithDevices = await Promise.all(
      data.map(async (defect: any) => {
        
        const deviceData = await externalApi.callGetApi(MASTER_BACKED_URL+'/device/' + defect.device_id, getToken);

        return {
          ...defect.toJSON(),
          device: deviceData.data,
        };
      })
    );
    
    const datawithSteps = await Promise.all(
      dataWithDevices.map(async (data) => {
        const odQuestionnaireData = await Promise.all(
          data.od_questionnaires.map(async (odq: any) => {
            const deviceData = await externalApi.callGetApi(MASTER_BACKED_URL+'/question/' + odq.odq_id, getToken);
            return {
              ...odq,
              question_title: deviceData?.data?.question_title || '',
              option_title: deviceData?.data?.options.find(() => data.option_id === data.answer_id).option_title || ''
            };
          })
        );

        return {
          ...data,
          od_questionnaires: odQuestionnaireData,
        };
      })
    );

    return {
      message: `${total} order data has been received.`,
      data: datawithSteps,
      total,
    }
  }

  public static async getById(req: Request, id: number) {
    const order = await OrderDefects.findByPk(id, {
      include: [OdSteps, OdQuestionnaires]
    });
    const getToken = currentToken(req);
    const MASTER_BACKED_URL = process.env.MASTER_BACKED_URL;
    const deviceData = await externalApi.callGetApi(MASTER_BACKED_URL+'/device/' + order?.device_id, getToken)
    return { ...order.toJSON(), device: deviceData.data }
  }

  public static async create(payload: any) {
    const value = useValidation(schema.create, payload);

    let findOrderDetails = await OrderDefects.findOne({
      where: {
        device_id: value.device_id,
        od_order_number: value.od_order_number,
        od_status: [0,1]
      }
    });

    if (findOrderDetails != null) {
      return findOrderDetails
    } else {
      const created = await OrderDefects.create(value);
      return created
    }
  }

  public static async update(id: number, payload: Partial<any>) {
    const value = useValidation(schema.update, payload);

    const [updated] = await OrderDefects.update(value, {
      where: { od_id: id },
    });

    if (updated) {
      const updateDevice = await OrderDefects.findByPk(id);
      return updateDevice;
    }
  }
  public static async delete(defect_id: number) {

    const deleted = await OrderDefects.update(
      {
        od_status: 0,
      },
      {
        where: { category_id: defect_id },
      }
    );

    return deleted;
  }


  /**
   *
   * @param req Request
   */
  public static async getOfferByDefectId(req: Request, defect_id: string) {

    const getToken = currentToken(req);
    const BASE_URL_EXPERT = process.env.BASE_URL_EXPERT;
   
    const data = await externalApi.callGetApi(BASE_URL_EXPERT+ `/offer/offer-by-defect/`+defect_id, getToken);
    return data;
  }

  /**
   *
   * @param req Request
   */
  public static async acceptOffer(req: Request) {

    const getToken = currentToken(req);
    let payload = req.getBody();
    const BASE_URL_EXPERT = process.env.BASE_URL_EXPERT;
   
    const data = await externalApi.callPostApi(BASE_URL_EXPERT+ `/offer/accept`, getToken, payload);
    return data;
  }


  /**
   *
   * @param req Request
   */
  public static async rejectOffer(req: Request) {

    const getToken = currentToken(req);
    let payload = req.getBody();
    const BASE_URL_EXPERT = process.env.BASE_URL_EXPERT;
   
    const data = await externalApi.callPostApi(BASE_URL_EXPERT+ `/offer/reject`, getToken, payload);
    return data;
  }
}

export default OrderService;
