# OpenAPI Service

This service implements [sparse fieldsets](https://jsonapi.org/format/#fetching-sparse-fieldsets), which allow to limit the amount of data returned to the client to whatever is specified in the corresponding filters.

**This service will NOT throw an error if invalid fieldset values are requested via the filters.**

### Running the service

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

4. API docs for the service should also be accessible at `http://localhost:3000/api-docs`
