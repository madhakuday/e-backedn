import * as yup from "yup";

const create = yup.object().shape({
  question_id: yup.number().required("Question id is required"),
  answer_id: yup.number().required("Answer id is required"),
  od_id: yup.number().required("Order id is required"),
  // odq_details: yup.number().required("Answer id is required"),
});

const update = yup.object().shape({
  question_id: yup.number(),
  answer_id: yup.number(),
  od_id: yup.number(),
  odq_id: yup.number().required("Question id is required"),
});
export default { create, update };
