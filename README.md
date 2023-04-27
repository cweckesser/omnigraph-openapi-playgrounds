# OmniGraph OpenAPI Playgrounds

Playgrounds for testing the OmniGraph OpenAPI library.

This project is structured into the following sub-projects:

- `openapi-service`: An OpenAPI Express application with some dummy endpoints that return mock data.
- `graphql-service`: A GraphQL Express application that consumes the schema fetched from the OpenAPI application. This application allows running GraphQL queries by proxying them to the OpenAPI application.

### Running the services

**OpenAPI Service**

1. Navigate to the service's folder and retrieve its dependencies:

```shell
cd PATH_TO_CLONED_PROJECT/openapi-service
yarn
```

2. Build and run the service:

```shell
yarn build
yarn start
```

3. Verify that the service is accessible at `http://127.0.0.1:3000/people`

**GraphQL Service**

1. Navigate to the GraphQL Service's folder and retrieve its dependencies:

```shell
cd PATH_TO_CLONED_PROJECT/graphql-service
yarn
```

2. Fetch the OpenAPI Service's schema with the corresponding script:

```shell
cd PATH_TO_CLONED_PROJECT/graphql-service/schemas/openapi-service
./schema-retriever.sh
```

Note: Navigate to the folder specified in the snippet above so the schema is retrieved and saved in the same folder where the script is. This is important because the GraphQL Service will attempt to read the schema from this location.

3. Build and run the service:

```shell
# Navigate back from the schemas/openapi-service folder to the GraphQL Service's main project folder
yarn build
yarn start
```

4. Verify that the service is accessible at `http://127.0.0.1:3001/graphql`
