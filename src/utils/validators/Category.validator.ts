import { ICategory } from "../../types";
import { isEmpty, isValid } from "./helpers";

export const validateCreateCategoryInput = ({ name }: ICategory) => {
  const errors: {
    [key: string]: string;
  } = {};

  if (isEmpty(name)) errors.name = "Name cannot be empty";

  return {
    valid: isValid(errors),
    errors,
  };
};
