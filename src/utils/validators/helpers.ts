/* eslint-disable no-useless-escape */
import mongoose from "mongoose";

export const isEmpty = (value?: string | number) =>
  !!!value || typeof value === "undefined" || String(value).trim() === "";

export const isNumber = (value: any) => !Number.isNaN(Number(value));

export const isEmail = (string: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (string.match(regex)) {
    return true;
  }

  return false;
};

export const isPhoneNumber = (value: string) => {
  return /^\d{13,}$/.test(value.replace(/[\s()+\-\.]|ext/gi, ""));
};

export const isValid = (errors: { [key: string]: string }) =>
  Object.values(errors).length === 0 ? true : false;

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);
