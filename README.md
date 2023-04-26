# omnigraph-openapi-playgrounds
Playgrounds for testing the OmniGraph OpenAPI library.

This project is structured into the following sub-projects:

- `openapi-service`: An OpenAPI Express application with some dummy endpoints that return mock data.
- `graphql-service`: A GraphQL Express application that consumes the schema fetched from the OpenAPI application. This application allows running GraphQL queries by proxying them to the OpenAPI application.
