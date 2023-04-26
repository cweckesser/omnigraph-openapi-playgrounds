export interface Person {
	id: string;
	firstName: string;
	lastName: string;
	contact?: Contact;
	employment?: Employment;
}

export interface Contact {
	email?: string;
	phone?: string;
}

export interface Employment {
	department: string;
	position: string;
}
