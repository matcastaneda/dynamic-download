import { SelectedFile } from '../interfaces';
import DownloadItem from './DownloaderItem';
import GeneratingFile from './GeneratingFile';

type DownloaderListProps = {
	files: SelectedFile[];
	isGeneratingFile: boolean;
};

const DownloaderList: React.FC<DownloaderListProps> = props => {
	const { files, isGeneratingFile } = props;

	const sortedFiles = files?.sort((a, b) => {
		if (a.status === 'downloading' && b.status !== 'downloading') return -1;
		if (a.status !== 'downloading' && b.status === 'downloading') return 1;
		return 0;
	});

	return (
		<ul
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyItems: 'center',
				backgroundColor: '#555270',
				overflowY: files?.length > 4 ? 'scroll' : 'hidden',
				maxHeight: files?.length > 4 ? 300 : 'auto',
				width: '100%'
			}}>
			{isGeneratingFile && <GeneratingFile />}

			{sortedFiles?.map(file => (
				<DownloadItem key={file.id} file={file} />
			))}
		</ul>
	);
};

export default DownloaderList;
