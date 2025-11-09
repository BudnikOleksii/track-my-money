import { IntlError } from 'next-intl';

export const onTranslateError = (error: IntlError) => {
  console.error(
    `[Translation exception]: ${error.code}, error description: ${
      error?.originalMessage || 'description not defined'
    }`,
  );
};
