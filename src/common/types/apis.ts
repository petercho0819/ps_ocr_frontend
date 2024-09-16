type SuccessResponseAPI<T> = {
  success: true;
  message: string;
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
  data: null;
};

export type ApiServerResponse<T> = SuccessResponseAPI<T> | ErrorResponse;
