import { Request } from "express";
import useValidation from "../../helpers/useValidation";
import schema from "./schema";
import PluginSqlizeQuery from "../../modules/SqlizeQuery/PluginSqlizeQuery";
import OdStep from "../../models/od_step";
import { Op, Transaction, where } from "sequelize/types";

class OrderStepService {
  public static async getAll(req: Request) {
    const { filtered = [] } =
      req.query;
    req.query.filtered = filtered;
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req.query,
      OdStep,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    );

    const total = await OdStep.count({
      where: queryFind.where,
    });

    const data = await OdStep.findAll({
      ...queryFind,
    });

    return {
      message: `${total} data has been received.`,
      data,
      total,
    };
  }

  public static async getPreviewList(id: number) {
    const data = await OdStep.findAll({
      where: { od_id: id }
    })
    console.log('data', data);
    
    const finalData: any= {
      images: [],
      videos: []
    }
    data.forEach((element: any) => {
      if(element.ods_doc_type === 'image'){
        finalData.images.push({data: element})
      }else {
        finalData.videos.push({data: element})
      }
    });
    return finalData
  }

  public static async create(
    payload: { data: any[]; od_id: number },
    txn: Transaction
  ) {
    const { data, od_id } = payload;
    const storedData: any[] = [];

    for (const step of data) {
      const value = useValidation(schema.create, {
        ...step,
        od_id,
      });
      try {
        const created = await OdStep.create(value, { transaction: txn });
        if (created) {
          storedData.push(created);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return storedData;
  }

  public static async update(
    payload: { od_id: number; data: any[] },
    txn: Transaction
  ) {
    const { od_id, data } = payload;

    for (const question of data) {
      const questionValue = useValidation(schema.update, {
        ...question,
        od_id,
      });

      const updated = await OdStep.update(questionValue, {
        where: { ods_id: question.ods_id },
        transaction: txn,
      });
    }
  }

  public static async delete(id: number) {
    return 1;
  }

}

export default OrderStepService;
