import { Model, Optional } from "sequelize";
import SequelizeAttributes from "../utils/SequelizeAttributes";
import db from "./_instance";

export interface BankAttributes {
  bank_account_id: number
  bank_account_no: string;
  bank_account_holder_name: string;
  bank_account_routing_no: string;
  bank_account_is_default: boolean;
  bank_account_status?: number
  od_id: BigInt
  customer_id: BigInt
  created_at?: Date;
  updated_at?: Date;
}
interface BankCreationAttributes
  extends Optional<BankAttributes, "bank_account_id"> { }
export interface OrderDefectsInstance
  extends Model<BankAttributes, BankCreationAttributes>,
  BankAttributes { }

const Bank = db.sequelize.define<OrderDefectsInstance>(
  "bank_accounts",
  {
    ...SequelizeAttributes.bank_accounts,
  },
  {
    timestamps: false,
    defaultScope: {},
  }
);

Bank.associate = (models: {OrderDefects: any}) => {
  Bank.belongsTo(models.OrderDefects, {
    foreignKey: "od_id",
    sourceKey: "od_id",
    targetKey: "od_id",
  });
};

export default Bank;
