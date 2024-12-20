export type TRequest<T> = {
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
};
