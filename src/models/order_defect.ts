import { Model, Optional } from "sequelize";
import SequelizeAttributes from "../utils/SequelizeAttributes";
import db from "./_instance";

export interface OrderDefectsAttributes {
  od_id: number;
  category_id: number;
  device_id: number;
  customer_id: number;
  delivery_partner_id: number;
  od_customer_name: string;
  od_order_number: number;
  od_shipping_address: string;
  od_invoice: string;
  od_damage_grade: string;
  od_defect_damage_details: string;
  od_status: number;
  od_customer_email:string;
  od_customer_number: number
  created_at: Date;
  updated_at: Date;
}
interface OrderDefectsCreationAttributes
  extends Optional<OrderDefectsAttributes, "od_id"> { }
export interface OrderDefectsInstance
  extends Model<OrderDefectsAttributes, OrderDefectsCreationAttributes>,
  OrderDefectsAttributes { }

const OrderDefects = db.sequelize.define<OrderDefectsInstance>(
  "order_defects",
  {
    ...SequelizeAttributes.order_defects,
  },
  {
    timestamps: false,
    defaultScope: {},
  }
);

OrderDefects.associate = (models: {OdSteps: any, Od_Questionnaires: any}) => {
  OrderDefects.hasMany(models.OdSteps, {
    foreignKey: "od_id",
    sourceKey: "od_id",
    targetKey: "od_id",
  });

  OrderDefects.hasMany(models.Od_Questionnaires, {
    foreignKey: "od_id",
    sourceKey: "od_id",
    targetKey: "od_id",
  });
};

export default OrderDefects;
