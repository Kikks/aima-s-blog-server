import { IAdmin } from "../../types";
import { isEmail, isEmpty, isValid } from "./helpers";

export const validateAdminLoginInputs = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors: { [key: string]: string } = {};

  if (isEmpty(email)) errors.email = "Email cannot be empty";
  else if (!isEmail(email)) errors.email = "Invalid email";

  if (isEmpty(password)) errors.password = "Password cannot be empty";

  return {
    valid: isValid(errors),
    errors,
  };
};

export const validateUpdateAdminInputs = ({ email, firstName, lastName }: IAdmin) => {
  const errors: { [key: string]: string } = {};

  if (isEmpty(email)) errors.email = "Email cannot be empty";
  else if (!isEmail(email)) errors.email = "Invalid email";

  if (isEmpty(firstName)) errors.firstName = "First Name cannot be empty";
  if (isEmpty(lastName)) errors.lastName = "Last Name cannot be empty";

  return {
    valid: isValid(errors),
    errors,
  };
};

export const validateUpdateAdminPasswordInput = ({ password }: { password: string }) => {
  const errors: { [key: string]: string } = {};

  if (isEmpty(password)) errors.password = "Password";

  return {
    valid: isValid(errors),
    errors,
  };
};

export const validateCreateAdminInput = ({ email, firstName, lastName, password }: IAdmin) => {
  const errors: { [key: string]: string } = {};

  if (isEmpty(email)) errors.email = "Email cannot be empty";
  else if (!isEmail(email)) errors.email = "Invalid email";

  if (isEmpty(firstName)) errors.firstName = "First Name cannot be empty";
  if (isEmpty(lastName)) errors.lastName = "Last Name cannot be empty";
  if (isEmpty(password)) errors.password = "Password cannot be empty";

  return {
    valid: isValid(errors),
    errors,
  };
};
