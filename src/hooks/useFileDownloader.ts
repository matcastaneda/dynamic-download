import { useState } from 'react';
import axios from 'axios';
import {
	type FileType,
	type FileDownload,
	type SelectedFile
} from '../interfaces';
import { isBase64 } from '../utils/validations';
import { base64ToBlob } from '../utils/base64ToBlob';
import { generateUniqueFileName } from '../utils/generateUniqueFileName';

export const useFileDownloader = () => {
	const [fileList, setFilesList] = useState<SelectedFile[]>([]);

	const getFileBlobFromURL = (url: string) => {
		return axios
			.get(url, { responseType: 'blob' })
			.then(response => response.data);
	};

	const saveBlobAsLocalFile = (
		data: BlobPart,
		name: string,
		type: FileType
	) => {
		const formattedData = isBase64(data as string)
			? base64ToBlob(data as string)
			: (data as Blob);

		const blob = new Blob([formattedData], { type });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.href = url;
		link.download = name;
		link.style.display = 'none';

		document.body.appendChild(link);

		link.addEventListener('click', function listener() {
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
			link.removeEventListener('click', listener);
		});

		link.click();
	};

	const updateFileList = (id: number, updates: Partial<SelectedFile>) => {
		setFilesList(prev => {
			const fileExists = prev.some(file => file.id === id);

			if (fileExists) {
				return prev.map(prevFile =>
					prevFile.id === id ? { ...prevFile, ...updates } : prevFile
				);
			}

			return [...prev, { id, ...updates }] as SelectedFile[];
		});
	};

	const downloadFile = async (file: FileDownload) => {
		const { id, name, type, urlToDownload } = file;
		const uniqueName = generateUniqueFileName(name, fileList);

		updateFileList(id, { status: 'downloading', name: uniqueName, type });

		try {
			const data = await getFileBlobFromURL(urlToDownload);
			saveBlobAsLocalFile(data, name, type);
			updateFileList(id, { status: 'downloaded' });
		} catch (error) {
			console.error('Failed to download file:', error);
			updateFileList(id, { status: 'error' });
		}
	};

	const clearDownloads = () => {
		setFilesList([]);
	};

	return { fileList, downloadFile, clearDownloads };
};
