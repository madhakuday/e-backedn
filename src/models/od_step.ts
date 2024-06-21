import { Model, Optional } from "sequelize";
import SequelizeAttributes from "../utils/SequelizeAttributes";
import db from "./_instance";

export interface OdStepsAttributes {
  ods_id: number
  od_id: number;
  question_id: number;
  answer_id: number;
  odq_details: string;
  created_at?: Date;
  updated_at?: Date;
}
interface OdStepsCreationAttributes
  extends Optional<OdStepsAttributes, "ods_id"> { }
export interface OrderDefectsInstance
  extends Model<OdStepsAttributes, OdStepsCreationAttributes>,
  OdStepsAttributes { }

const OdSteps = db.sequelize.define<OrderDefectsInstance>(
  "od_steps",
  {
    ...SequelizeAttributes.od_steps,
  },
  {
    timestamps: false,
    defaultScope: {},
  }
);

OdSteps.associate = (models: {OrderDefects: any}) => {
  OdSteps.belongsTo(models.OrderDefects, {
    foreignKey: "od_id",
    sourceKey: "od_id",
    targetKey: "od_id",
  });
};

export default OdSteps;
