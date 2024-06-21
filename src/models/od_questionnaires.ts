import { Model, Optional } from "sequelize";
import SequelizeAttributes from "../utils/SequelizeAttributes";
import db from "./_instance";

export interface Od_QuestionnairesAttributes {
  odq_id: number
  od_id: number;
  question_id: number;
  answer_id: number;
  odq_details: string;
  created_at?: Date;
  updated_at?: Date;
}
interface Od_QuestionnairesCreationAttributes
  extends Optional<Od_QuestionnairesAttributes, "od_id"> { }
export interface OrderDefectsInstance
  extends Model<Od_QuestionnairesAttributes, Od_QuestionnairesCreationAttributes>,
  Od_QuestionnairesAttributes { }

const Od_Questionnaires = db.sequelize.define<OrderDefectsInstance>(
  "od_questionnaires",
  {
    ...SequelizeAttributes.od_questionnaires,
  },
  {
    timestamps: false,
    defaultScope: {},
  }
);

Od_Questionnaires.associate = (models: {OrderDefects: any}) => {
  Od_Questionnaires.belongsTo(models.OrderDefects, {
    foreignKey: "od_id",
    sourceKey: "od_id",
    targetKey: "od_id",
  });
};

export default Od_Questionnaires;
