import Database from './table-operations';


function generateResult(text) {
	return {
		"source": "pressbotbox.com",
		"payload": {
			"facebook": {
				"text": text
			}
		}
	};
}

export function enrollUser(userId) {
	return generateResult(userId);
}
