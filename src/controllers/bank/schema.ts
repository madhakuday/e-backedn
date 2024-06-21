import * as yup from "yup";

const create = yup.object().shape({
  bank_account_no: yup.string().required("Bank account number is required"),
  bank_account_holder_name: yup.string().required("Account holder name is required"),
  bank_account_routing_no: yup.string().required("Routing number required"),
  bank_account_is_default: yup.string().nullable(),
  bank_account_status: yup.string().nullable(),
  od_id: yup.string().required("Order defect id is required"),
  customer_id: yup.string().required("customer id is required"),
  created_at: yup.number().nullable(),
  updated_at:  yup.date().nullable(),
});

export default { create };
