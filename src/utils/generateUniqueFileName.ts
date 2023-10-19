import { SelectedFile } from '../interfaces';

export const generateUniqueFileName = (
	name: string,
	fileList: SelectedFile[]
): string => {
	const extensionIndex = name.lastIndexOf('.');
	const baseName = extensionIndex !== -1 ? name.slice(0, extensionIndex) : name;
	const extension = extensionIndex !== -1 ? name.slice(extensionIndex) : '';

	let counter = 1;
	let newName = name;

	while (fileList.some(file => file.name === newName)) {
		newName = `${baseName} (${counter++})${extension}`;
	}

	return newName;
};
