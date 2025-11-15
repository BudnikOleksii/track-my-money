# API Documentation and Type Generation

This guide explains how to generate OpenAPI documentation and TypeScript types for the Track My Money API.

## Overview

The project uses a two-step process to generate API documentation and types:

1. **Generate OpenAPI Specification** - Creates an OpenAPI/Swagger JSON file from the NestJS API
2. **Generate TypeScript Types** - Generates TypeScript types and API client from the OpenAPI specification

## Prerequisites

- Node.js 22.15.0
- pnpm 10.10.0
- All dependencies installed (`pnpm install`)

## Step 1: Generate OpenAPI Specification

The OpenAPI specification is generated from the NestJS application using Swagger decorators and configuration.

### Location

- **Script**: `apps/api/scripts/generate-openapi.ts`
- **Output**: `apps/api/openapi.json`

### How to Run

From the root of the project:

```bash
cd apps/api
pnpm run generate:openapi
```

Or from the project root:

```bash
pnpm --filter api generate:openapi
```

### What It Does

1. Creates a NestJS application instance
2. Configures Swagger/OpenAPI documentation with:
   - API title: "Track My Money API"
   - Version: "1.0"
   - Bearer JWT authentication
   - Tags for different endpoint groups (auth, categories, transactions)
3. Generates the OpenAPI specification document
4. Writes it to `apps/api/openapi.json`

### Output

The script generates `apps/api/openapi.json`, which contains the complete OpenAPI 3.0 specification of your API, including:

- All endpoints
- Request/response schemas
- Authentication requirements
- Tags and descriptions

## Step 2: Generate TypeScript Types

After generating the OpenAPI specification, you can generate TypeScript types and an API client for the frontend.

### Location

- **Script**: `apps/web-tracker/scripts/generate-api-types.ts`
- **Input**: `apps/api/openapi.json`
- **Output**: `apps/web-tracker/src/api/generated/`

### How to Run

From the root of the project:

```bash
cd apps/web-tracker
pnpm run generate:api-types
```

Or from the project root:

```bash
pnpm --filter web-tracker generate:api-types
```

### What It Does

1. Reads the OpenAPI specification from `apps/api/openapi.json`
2. Generates TypeScript types using `swagger-typescript-api`
3. Creates:
   - Type definitions for all request/response models
   - API client with typed methods
   - Route types
   - Enum types
4. Outputs everything to `apps/web-tracker/src/api/generated/`

### Generated Files

The script generates:

- **Api.ts** - Main API client with typed methods
- **DataContracts.ts** - TypeScript interfaces for all DTOs
- **HttpClient.ts** - HTTP client implementation
- Additional type definition files

### Configuration

The generation is configured with:

- `httpClientType: 'fetch'` - Uses native Fetch API
- `generateClient: true` - Generates API client
- `generateRouteTypes: true` - Generates route type definitions
- `generateResponses: true` - Generates response types
- `extractEnums: true` - Extracts enum types
- `singleHttpClient: true` - Uses a single HTTP client instance
- `cleanOutput: true` - Cleans output directory before generation

## Complete Workflow

To generate both the OpenAPI spec and TypeScript types:

```bash
# Step 1: Generate OpenAPI specification
pnpm --filter api generate:openapi

# Step 2: Generate TypeScript types
pnpm --filter web-tracker generate:api-types
```

Or run them sequentially:

```bash
cd apps/api && pnpm run generate:openapi && cd ../web-tracker && pnpm run generate:api-types
```

## When to Regenerate

You should regenerate the API documentation and types when:

- Adding new API endpoints
- Modifying existing endpoints (request/response DTOs)
- Changing authentication requirements
- Updating API version or metadata
- Before committing changes that affect the API contract

## Troubleshooting

### OpenAPI Generation Fails

- **Error**: "Cannot find module" or import errors
  - **Solution**: Ensure all dependencies are installed with `pnpm install`
  - Make sure the API builds successfully: `pnpm --filter api build`

- **Error**: "AppModule not found"
  - **Solution**: Verify `apps/api/src/app.module.ts` exists and is properly configured

### Type Generation Fails

- **Error**: "Cannot find openapi.json"
  - **Solution**: Run the OpenAPI generation step first: `pnpm --filter api generate:openapi`

- **Error**: "swagger-typescript-api not found"
  - **Solution**: Install dependencies: `pnpm install` in the web-tracker app

- **Error**: TypeScript compilation errors in generated files
  - **Solution**: Check the OpenAPI spec for invalid schemas or missing required fields

- **Error**: "Unknown file extension .ts" or ESM module errors when running `generate:api-types`
  - **Solution**: The project uses `tsconfig.node.json` to configure TypeScript for script execution. Ensure this file exists and uses CommonJS module format. If the error persists, run `pnpm install` to ensure all dependencies are installed.

## Integration with CI/CD

Consider adding these generation steps to your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Generate OpenAPI spec
  run: pnpm --filter api generate:openapi

- name: Generate API types
  run: pnpm --filter web-tracker generate:api-types

- name: Check for changes
  run: git diff --exit-code apps/api/openapi.json apps/web-tracker/src/api/generated/
```

This ensures that API documentation and types stay in sync with the codebase.

## Additional Resources

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [swagger-typescript-api Documentation](https://github.com/acacode/swagger-typescript-api)
