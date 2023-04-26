import * as bodyParser from 'body-parser';
import express from 'express';
import { initialize } from 'express-openapi';

const app = express();

app.use(bodyParser.json());

initialize({
	apiDoc: `${__dirname}/config/open-api.yaml`,
	app,
	paths: `${__dirname}/controllers`,
});

const port = 3000;
app.listen(port, () => {
	console.log(`OpenAPI Service running @ http://127.0.0.1:${port}!\n`);
	console.log(`Try any of these commands:`);
	console.log(`\t- curl http://127.0.0.1:${port}/people`);
	console.log(`\t- curl http://127.0.0.1:${port}/people?id=id-1&fields[contact]=email&fields[contact]=phone&fields[employment]=position`);
});
