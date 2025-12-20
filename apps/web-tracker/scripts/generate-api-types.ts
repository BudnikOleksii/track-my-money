import { generateApi } from 'swagger-typescript-api';
import { join } from 'path';

// TODO: get from .env
const apiUrl = 'http://localhost:8080/api/v1';

if (!apiUrl) {
  console.error('Api URL not specified');
  process.exit(1);
}

const outputPath = join(__dirname, '../src/api/generated');

generateApi({
  output: outputPath,
  url: `${apiUrl}/openapi.json`,
  generateClient: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: true,
  unwrapResponseData: false,
  defaultResponseAsSuccess: false,
  cleanOutput: true,
  enumNamesAsValues: true,
  moduleNameFirstTag: false,
  extraTemplates: [],
  hooks: {
    onFormatTypeName: (typeName) => {
      return typeName;
    },
  },
})
  .then(() => {
    console.warn(`API types generated successfully at: ${outputPath}`);
  })
  .catch((error) => {
    console.error('Error generating API types:', error);
    process.exit(1);
  });
