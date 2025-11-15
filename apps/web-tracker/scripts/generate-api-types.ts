import { generateApi } from 'swagger-typescript-api';
import { join } from 'path';

const openApiPath = join(__dirname, '../../api/openapi.json');
const outputPath = join(__dirname, '../src/api/generated');

generateApi({
  output: outputPath,
  input: openApiPath,
  httpClientType: 'fetch',
  generateClient: true,
  generateRouteTypes: true,
  generateResponses: true,
  toJS: false,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: true,
  unwrapResponseData: false,
  defaultResponseAsSuccess: false,
  singleHttpClient: true,
  cleanOutput: true,
  enumNamesAsValues: true,
  moduleNameFirstTag: false,
  generateUnionEnums: true,
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
