import { useFileDownloader } from '../hooks/useFileDownloader';
import { SelectedFile } from '../interfaces';

type RetryDownloadProps = {
	file: SelectedFile;
};

const statusMessages = {
	downloading: 'Si no inició la descarga de forma automática',
	error: 'Para intentar nuevamente'
};

const RetryDownload: React.FC<RetryDownloadProps> = ({ file }) => {
	const { downloadFile } = useFileDownloader();

	if (file.status === 'downloaded') return null;

	const message = statusMessages[file.status];

	return (
		<p style={{ fontSize: 12 }}>
			{message},{' '}
			<button
				onClick={() => downloadFile(file)}
				style={{
					background: 'none',
					textDecoration: 'underline',
					border: 'none',
					color: 'inherit',
					cursor: 'pointer',
					fontSize: 12,
					padding: 0
				}}>
				haz clic aquí.
			</button>
		</p>
	);
};

export default RetryDownload;
