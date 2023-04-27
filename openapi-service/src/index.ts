import * as bodyParser from 'body-parser';
import express from 'express';
import { initialize } from 'express-openapi';

import { info } from './helpers/logger';

const app = express();

app.use(bodyParser.json());

initialize({
	apiDoc: './config/open-api.yaml',
	app,
	paths: './dist/controllers',
	// Allow TS support
	routesGlob: '**/*.{ts,js}',
	routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
	// Coerce request properties according to the OpenAPI parameter list
	enableObjectCoercion: true,
});

const port = 3000;

app.listen(port, () => {
	info(`OpenAPI Service running @ http://127.0.0.1:${port}!\n`);
	info(`Try any of these commands:`);
	info(`\t- curl http://127.0.0.1:${port}/people`);
	info(`\t- curl http://127.0.0.1:${port}/people?id=id-1&fields[contact]=email&fields[contact]=phone&fields[employment]=position`);
});
