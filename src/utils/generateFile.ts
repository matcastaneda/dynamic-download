import { FileDownload } from '../interfaces';
import { extractNameAndTypeFromUrl } from './extractNameAndType';
import { hasExtension } from './validations';

export const createFileDownloadFromUrl = (
	id: number,
	url: string,
	customName?: string
): FileDownload => {
	const { name, type } = extractNameAndTypeFromUrl(url);
	const customFileName = customName
		? hasExtension(customName)
			? customName
			: `${customName}.${type}`
		: undefined;

	return {
		id: id,
		name: customFileName || name,
		urlToDownload: url,
		type
	};
};

export const createFileDownloadFromBase64 = (
	id: number,
	base64: string,
	customName?: string
): FileDownload => {
	const base64WithPrefix = `data:image/png;base64,${base64}`;
	const finalName = customName
		? hasExtension(customName)
			? customName
			: `${customName}.png`
		: 'test.png';

	return {
		id: id,
		name: finalName,
		urlToDownload: base64WithPrefix,
		type: 'png'
	};
};
