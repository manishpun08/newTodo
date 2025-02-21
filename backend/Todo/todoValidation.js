import Yup from "yup";

export const todoValidationSchema = Yup.object({
  task: Yup.string(),
  description: Yup.string(),
});
