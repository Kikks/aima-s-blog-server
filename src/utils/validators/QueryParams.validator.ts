import { QueryParams } from "../../types/QueryParams.type";
import { isValid } from "./helpers";

export const validateQueryParams = ({ limit, page }: QueryParams) => {
  const errors: {
    [key: string]: string;
  } = {};

  if ((limit || 0) < 0) errors.name = "Limit must be positive";
  if ((page || 0) - 1 < 0) errors.name = "Page must be positive";

  return {
    valid: isValid(errors),
    errors,
  };
};
