export default function pick(object: Record<string, any>, keys: string[]) {
	return keys.reduce((obj, key) => {
		if (object && object.hasOwnProperty(key)) {
			obj[key] = object[key];
		}
		return obj;
	}, {} as Record<string, any>)
}
