import { ErrorResponse } from "../../interfaces/ErrorResponse.interface";

export const createError = (e: any): ErrorResponse => {
  let data: any = {};
  if (e instanceof Error) {
    data["error"] = e.message;
  }
  const errorResponse: ErrorResponse = {
    error: "Error creating access",
    status: 500,
    data,
  };
  return errorResponse;
};
