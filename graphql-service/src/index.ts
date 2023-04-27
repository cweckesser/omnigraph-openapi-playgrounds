import { loadGraphQLSchemaFromOpenAPI } from '@omnigraph/openapi';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { ExecutionArgs, ExecutionResult, execute } from 'graphql';

const app = express();

const port = 3001;

(async () => {
	const openApiServiceSchema = await loadGraphQLSchemaFromOpenAPI('openapi-service', {
		cwd: './',
		source: './schemas/openapi-service/schema.json',
		endpoint: 'http://localhost:3000',
	});

	app.use(
		'/graphql',
		graphqlHTTP({
			schema: openApiServiceSchema,
			graphiql: true,
			customExecuteFn: async (
				args: ExecutionArgs,
			): Promise<ExecutionResult> => {
				const result = await execute(args);
				return result;
			},
		}),
	);

	app.listen(port, () => {
		console.log(`GraphQL Service running @ http://127.0.0.1:${port}!\n`);
		console.log(`Try accessing http://127.0.0.1:${port}/graphql`);
	});
})();