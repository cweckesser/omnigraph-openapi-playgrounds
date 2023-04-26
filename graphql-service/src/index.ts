import { stitchSchemas } from '@graphql-tools/stitch';
import { createBundle, getGraphQLSchemaFromBundle } from '@omnigraph/openapi';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const app = express();

const port = 3001;

(async () => {
	const openApiServiceBundle = await createBundle('openapi-service', {
		cwd: './',
		oasFilePath: './schemas/openapi-service/schema.json',
		baseUrl: 'http://localhost:3000',
	});
	const openApiServiceSchema = await getGraphQLSchemaFromBundle(openApiServiceBundle);
	const openApiServiceSubSchemaConfig = {
		schema: openApiServiceSchema,
	};

	const subschemas = [openApiServiceSubSchemaConfig];

	const schema = stitchSchemas({ subschemas });

	app.use(
		'/graphql',
		graphqlHTTP({
			schema,
			graphiql: true,
		}),
	);

	app.listen(port, () => {
		console.log(`GraphQL Service running @ http://127.0.0.1:${port}!\n`);
		console.log(`Try accessing http://127.0.0.1:${port}/graphql`);
	});
})();