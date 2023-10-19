import { FileType } from '../interfaces';

export const extractNameAndTypeFromUrl = (url: string) => {
	const name = url.split('/').pop() || '';
	const type = (url.split('.').pop() || '') as FileType;
	return { name, type };
};
