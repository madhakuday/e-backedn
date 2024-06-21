import * as yup from "yup";

const create = yup.object().shape({
  category_id: yup.string().required("Category id is required"),
  device_id: yup.string().required("Device id is required"),
  customer_id: yup.string().required("Customer id is required"),
  od_customer_name: yup.string().required("Customer name is required"),
  od_order_number: yup.string().required("Order number is required"),
  od_shipping_address: yup.string().required("Shipping address is required"),
  od_invoice: yup.string().required("Invoice is required"),
  od_customer_email: yup.string().required("Email is required"),
  od_customer_number: yup.number().required("Number is required"),
});

const update = yup.object().shape({
  category_id: yup.string(),
  device_id: yup.string(),
  customer_id: yup.string(),
  od_customer_name: yup.string(),
  od_order_number: yup.string(),
  od_shipping_address: yup.string(),
  od_invoice: yup.string(),
  od_status: yup.string(),
  od_customer_email: yup.string(),
  od_customer_number: yup.number()
});
export default { create, update };
