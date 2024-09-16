import { AxiosResponse } from "axios";
import { UseMutationOptions } from "react-query";

export type MutationOption<T> = Omit<
  UseMutationOptions<AxiosResponse<any, any>, unknown, T, unknown>,
  "mutationFn"
>;
