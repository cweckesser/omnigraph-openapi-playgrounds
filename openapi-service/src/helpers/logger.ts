const DEBUG = process.env.DEBUG;

type Message = string | Error;
type LoggingType = 'debug' | 'info';

export function debug(message: Message): void {
	log(message, 'debug');
}

export function info(message: Message): void {
	log(message, 'info');
}

function log(message: Message, type: LoggingType): void {
	switch (type) {
		case 'debug':
			DEBUG && console.debug(message);
		break;
		case 'info':
			console.info(message);
		break;
	}
}