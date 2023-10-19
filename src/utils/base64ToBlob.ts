// type ContentType = 'image/jpeg' | 'image/jpg' | 'image/png';

export const base64ToBlob = (base64Data: string) => {
	const base64Payload = base64Data.split(',')[1] || base64Data;
	const byteCharacters = window.atob(base64Payload);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: 'image/png' });
};
