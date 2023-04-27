import { Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { debug } from '../helpers/logger';
import { Contact, Employment } from '../models/person-model';
import { PersonDao } from '../daos/person-dao';

export const GET: Operation = (req: Request, res: Response) => {
	const { query } = req;
	debug(`\nIncoming request with query parameters: ${JSON.stringify(query, null, 2)}\n`);

	const id: string = query.id as string;
	const fields = query.fields as any | {};
	const { contact, employment } = fields;

	let contactFields: string[] = [];
	if (contact) {
		contactFields = typeof contact === 'string'
			? contact.split(',')
			: contact;
		contactFields = contactFields.map((cf) => cf.toLowerCase());
	}

	let employmentFields: string[] = [];
	if (employment) {
		employmentFields = typeof employment === 'string'
			? employment.split(',')
			: employment;
		employmentFields = employmentFields.map((ef) => ef.toLowerCase());
	}

	const responsePayload = new PersonDao().all()
		.filter((p) => id === undefined || p.id === id)
		.map((p) => {
			if (p.contact && contactFields.length > 0) {
				p.contact = contactFields.reduce((acc: Contact, contactField: string) => {
					const key = contactField as keyof Contact;
					acc[key] = p.contact?.[key] as string;
					return acc;
				}, {} as Contact);
			}
			return p;
		})
		.map((p) => {
			if (p.contact && employmentFields.length > 0) {
				p.employment = employmentFields.reduce((acc: Employment, employmentField: string) => {
					const key = employmentField as keyof Employment;
					acc[key] = p.employment?.[key] as string;
					return acc;
				}, {} as Employment);
			}
			return p;
		});

	return res.status(200).json(responsePayload);
};

GET.apiDoc = {
	description: 'Returns a list of people or an unique instance (if matched by ID) with the specified fields (if provided)',
	operationId: 'getPeople',
	parameters: [
		{
			name: 'id',
			in: 'query',
			description: 'The ID of the person to retrieve',
			required: false,
			schema: {
				type: 'string',
			},
		},
		{
			name: 'fields[contact]',
			in: 'query',
			description: 'The "contact" fields to include for the retrieve person/people',
			required: false,
			schema: {
				type: 'array',
				items: {
					type: 'string',
					enum: ['email', 'phone'],
				},
			},
		},
		{
			name: 'fields[employment]',
			in: 'query',
			description: 'The "employment" fields to include for the retrieve person/people',
			required: false,
			schema: {
				type: 'array',
				items: {
					type: 'string',
					enum: ['department', 'position'],
				},
			},
		},
	],
	responses: {
		200: {
			description: 'Success',
			content: {
				['application/json']: {
					schema: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Person',
						}
					},
				},
			},
		},
		default: {
			description: 'Error',
			content: {
				['application/json']: {
					schema: {
						$ref: '#/components/schemas/ErrorResponse',
					},
				},
			},
		},
	},
};
