import { Person } from '../models/person-model';

const mockData: Record<string, Person> = {
	'id-1': {
		id: 'id-1',
		firstName: 'John',
		lastName: 'Doe',
		contact: {
			email: 'john.doe@example.com',
			phone: '+45 28 00 00 01',
		},
		employment: {
			position: 'Senior Account Manager',
			department: 'Sales',
		},
	},
	'id-2': {
		id: 'id-2',
		firstName: 'Jane',
		lastName: 'Doe',
		contact: {
			email: 'jane.doe@example.com',
			phone: '+45 28 00 00 02',
		},
		employment: {
			position: 'Staff SRE Engineer',
			department: 'Engineering',
		},
	},
};

export class PersonDao {
	public all(): Person[] {
		return Object.values(mockData)
	}
}
