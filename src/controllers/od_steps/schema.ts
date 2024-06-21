import * as yup from "yup";

const create = yup.object().shape({
  od_id: yup.number().required("Order id is required"),
  step_id: yup.number().required("Step id is required"),
  ods_doc: yup.string().required("Document is required"),
  ods_doc_type: yup.string().required("Documenttype is required"),
});

const update = yup.object().shape({
  step_id: yup.number(),
  answer_id: yup.number(),
  od_id: yup.number(),
  ods_doc: yup.string(),
  ods_doc_type: yup.string(),
});
export default { create, update };
