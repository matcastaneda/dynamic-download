export const isURL = (str: string) => {
	const urlRegex =
		/^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/;
	return !!urlRegex.test(str);
};

export const isBase64 = (str: string) => {
	const base64Regex =
		/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
	return !!base64Regex.test(str);
};

export const hasExtension = (filename: string): boolean => {
	const parts = filename.split('.');
	return parts.length > 1 && !/\s/.test(parts[parts.length - 1]);
};
