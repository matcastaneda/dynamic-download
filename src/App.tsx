import { useState } from 'react';
import { getFileData } from '../getFileData';
import { isBase64, isURL } from './utils/validations';
import { useFileDownloader } from './hooks/useFileDownloader';
import { FileDownload } from './interfaces';
import {
	createFileDownloadFromBase64,
	createFileDownloadFromUrl
} from './utils/generateFile';
import DynamicDownload from './DynamicDownload';

const transactions = [
	{
		transactionId: 1,
		name: 'Transacción 1'
	},
	{
		transactionId: 2,
		name: 'Transacción 2'
	},
	{
		transactionId: 3,
		name: 'Transacción 3'
	},
	{
		transactionId: 4,
		name: 'Transacción 4'
	}
];

const App = () => {
	const [isGeneratingFile, setIsGeneratingFile] = useState(false);
	const [clickedButtonId, setClickedButtonId] = useState<number | null>(null);

	const { fileList, downloadFile } = useFileDownloader();

	const handleDownloadFile = async (id: number, customName?: string) => {
		setIsGeneratingFile(true);
		setClickedButtonId(id);
		try {
			const fileUrl = await getFileData(id);

			let fileToDownload: FileDownload;

			if (isURL(fileUrl)) {
				fileToDownload = createFileDownloadFromUrl(id, fileUrl, customName);
			} else if (isBase64(fileUrl)) {
				fileToDownload = createFileDownloadFromBase64(id, fileUrl, customName);
			} else {
				throw new Error('Unknown file format.');
			}

			downloadFile(fileToDownload);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setIsGeneratingFile(false);
			setClickedButtonId(null);
		}
	};

	return (
		<>
			<ul>
				{transactions.map((tc, index) => (
					<li key={`tc-${tc.transactionId}-${tc.name}-${index}`}>
						<p>
							{tc.transactionId} - {tc.name}
						</p>

						<button
							disabled={
								isGeneratingFile && clickedButtonId === tc.transactionId
							}
							onClick={() => handleDownloadFile(tc.transactionId)}>
							Descargar
						</button>
					</li>
				))}
			</ul>

			{(fileList.length > 0 || isGeneratingFile) && (
				<DynamicDownload files={fileList} isGeneratingFile={isGeneratingFile} />
			)}
		</>
	);
};

export default App;
