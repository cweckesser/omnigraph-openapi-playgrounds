# GraphQL Service

### Running the service

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

4. Verify that `Graphiql` is accessible at `http://127.0.0.1:3001/graphql`

5. Run a query in `Graphiql`. A query example can be found in the next section [Sample queries](#sample-queries).


### Sample queries

The following query retrieves all the people from the OpenAPI Service.

**Note**: For more information on available fields and filters, check `Graphiql`'s "Documentation Explorer".

Notice that the OpenAPI Service implements fetching if sparse fieldsets, which are specified via filters. For more information on this, see the [OpenAPI Service documentation](/openapi-service/README.md). This means that any fields not included in the `fields_LEFT_SQUARE_BRACE_<SOME_TYPE>_RIGHT_SQUARE_BRACE_` input filters will not be fetched, regardless of them being specified in the body of the `getPeople` query.

```graphql
query {
  getPeople(
    fields_LEFT_SQUARE_BRACE_contact_RIGHT_SQUARE_BRACE_: [email, phone]
   	fields_LEFT_SQUARE_BRACE_employment_RIGHT_SQUARE_BRACE_: [position, department]
  ) {
    ... on Person {
      id
      firstName
      lastName
      contact {
        email
        phone
      }
      employment {
        position
        department
      }
    }
    ... on ErrorResponse {
      message
    }
  }
}
```
