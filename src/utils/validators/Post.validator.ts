import { IPost } from "../../types";
import { isEmpty, isValid } from "./helpers";

export const validateCreatePostInput = ({ title, category, coverImage, body, audio }: IPost) => {
  const errors: {
    [key: string]: string;
  } = {};

  if (isEmpty(title)) errors.name = "Title cannot be empty";
  if (isEmpty(category.toString())) errors.category = "Category cannot be empty";
  if (isEmpty(coverImage)) errors.coverImage = "Cover image cannot be empty";

  if (audio) {
    if (isEmpty(audio)) errors.audio = "Audio cannot be empty";
  }

  if (typeof body !== "string") errors.body = "Body must be a stringified object";
  else if (!JSON.parse(body)) errors.body = "Invalid body object";
  else {
    const parsedBody = JSON.parse(body);
    if (!parsedBody?.time || !parsedBody?.blocks || !parsedBody?.version)
      errors.body = "Invalid body object";
    else if (parsedBody?.blocks?.length < 1) errors.body = "Body cannot be empty";
  }

  return {
    valid: isValid(errors),
    errors,
  };
};
