import { Request, Response } from "express";
import useValidation from "../../helpers/useValidation";
import schema from "./schema";
import PluginSqlizeQuery from "../../modules/SqlizeQuery/PluginSqlizeQuery";
import OdQuestionnaire from "../../models/od_questionnaires";
import { Op, Transaction } from "sequelize/types";
import OrderDefects from "../../models/order_defect";

class QuestionnaireService {
  public static async getAll(req: Request) {
    const { filtered = [] } =
      req.query;
    req.query.filtered = filtered;
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req.query,
      OdQuestionnaire,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    );

    const total = await OdQuestionnaire.count({
      where: queryFind.where,
    });

    const data = await OdQuestionnaire.findAll({
      ...queryFind,
    });

    return {
      message: `${total} data has been received.`,
      data,
      total,
    };
  }

  public static async create(
    payload: { data: any[]; od_id: number, damage_details: string },
    txn: Transaction
  ) {
    const { data, od_id, damage_details } = payload;
    const storedData: any[] = [];

    for (const question of data) {
      const value = useValidation(schema.create, {
        ...question,
        od_id,
      });
      try {
        const created = await OdQuestionnaire.create(value, { transaction: txn });
        if (created) {
          storedData.push(created);
        }
      } catch (error) {
        console.log(error);
      }
    }

    await OrderDefects.update({ od_defect_damage_details: damage_details }, {
      where: { od_id: od_id },
      transaction: txn,
    });

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

      const updated = await OdQuestionnaire.update(questionValue, {
        where: { odq_id: question.odq_id },
        transaction: txn,
      });
    }
  }

  public static async delete(id: number) {

    return 1;
  }

}

export default QuestionnaireService;
