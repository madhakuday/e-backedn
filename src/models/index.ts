import Od_Questionnaires from "./od_questionnaires";
import OdSteps from "./od_step";
import OrderDefects from "./order_defect";

const models = {
  OdSteps,
  OrderDefects,
  Od_Questionnaires
};

export default models;

export type MyModels = typeof models;

Object.entries(models).map(([, model]) => {
  if (model?.associate) {
    model.associate(models);
  }
  return model;
});
