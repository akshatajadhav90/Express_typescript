import { QueryFailedError } from "typeorm";

export const MESSAGES = {
    PRODUCT: {
      CREATED_SUCCESS: "Product created successfully.",
      FETCH_SUCCESS: "Product fetched successfully.",
      NOT_FOUND: "Product not found.",
      UPDATE_SUCCESS: "Product updated successfully.",
      DELETE_SUCCESS: "Product deleted successfully."
    },
    ERROR: {
      INTERNAL_SERVER: "Something went wrong. Please try again later.",
    },

    REQUEST_BODY_REQUIRED : "Request body required"
  };
  