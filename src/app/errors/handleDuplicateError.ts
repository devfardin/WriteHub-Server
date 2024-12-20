/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse, TErrorSources } from '../interface/error';
const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = 400;
  const getMessage = error?.message
    .match(/"(.*?)"/g)
    .map((text: string) => text.replace(/"/g, ''));
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${getMessage[0]} is already exist`,
    },
  ];
  return {
    statusCode,
    message: 'Duplicate id',
    errorSources,
  };
};
export default handleDuplicateError;
