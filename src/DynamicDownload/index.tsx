import { useState } from 'react';
import DownloaderHeader from './DownloaderHeader';
import DownloaderList from './DownloaderList';
import { type SelectedFile } from '../interfaces';

type DynamicDownloadProps = {
	files: SelectedFile[];
	isGeneratingFile: boolean;
};

const DynamicDownload: React.FC<DynamicDownloadProps> = props => {
	const { files, isGeneratingFile } = props;

	const [isOpen, setIsOpen] = useState(true);

	const toggleOpen = () => setIsOpen(prev => !prev);

	const isDownloading = files?.some(file => file.status === 'downloading');
	const countDownloadingFiles = files?.filter(
		file => file.status === 'downloading'
	).length;
	const countDownloadedFiles = files?.filter(
		file => file.status === 'downloaded'
	).length;

	return (
		<section
			style={{
				position: 'absolute',
				display: 'block',
				bottom: 0,
				right: 24
			}}>
			<DownloaderHeader
				isOpen={isOpen}
				toggleOpen={toggleOpen}
				isDownloading={isDownloading}
				isGeneratingFile={isGeneratingFile}
				countDownloadingFiles={countDownloadingFiles}
				countDownloadedFiles={countDownloadedFiles}
			/>

			{isOpen && (
				<DownloaderList files={files} isGeneratingFile={isGeneratingFile} />
			)}
		</section>
	);
};

export default DynamicDownload;
