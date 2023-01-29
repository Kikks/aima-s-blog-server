import { IComment } from "../../types";
import { isEmpty, isValid } from "./helpers";

export const validateCreateCommentInput = ({ body }: IComment) => {
  const errors: {
    [key: string]: string;
  } = {};

  if (isEmpty(body)) errors.body = "Body cannot be empty";

  return {
    valid: isValid(errors),
    errors,
  };
};
