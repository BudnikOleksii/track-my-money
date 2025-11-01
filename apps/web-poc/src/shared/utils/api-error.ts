interface ApiErrorData {
  message?: string;
  statusCode?: number;
  error?: string;
}

interface ApiError {
  status: number;
  data: ApiErrorData;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number' &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null
  );
};

export const getApiErrorMessage = (error: unknown): string | undefined => {
  if (!isApiError(error)) {
    return undefined;
  }

  return error.data.message;
};

export const extractErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  const apiMessage = getApiErrorMessage(error);

  return apiMessage || fallbackMessage;
};
