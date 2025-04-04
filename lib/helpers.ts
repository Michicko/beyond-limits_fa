export const getObjectValue = <T extends Object>(
	obj: T,
	key: string | number | symbol,
) => {
	return obj[key as keyof typeof obj];
};
