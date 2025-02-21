import Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .trim()
    .max(25, "First name must be at max 25 characters."),
  lastName: Yup.string()
    .required("Last name is required.")
    .trim()
    .max(25, "Last name must be at max 55 characters."),
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase()
    .max(55, "Email must be at max 55 characters."),
  password: Yup.string()
    .required("Password is required.")
    .trim()
    .min(4, "Password must be at least 4 characters.")
    .max(20, "Password must be at max 20 characters."),
  gender: Yup.string().nullable().oneOf(["male", "female", "other"]).trim(),
});

export const loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
  password: Yup.string().required("Password is required.").trim(),
});
