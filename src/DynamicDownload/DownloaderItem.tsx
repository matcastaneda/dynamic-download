
import { IconType } from 'react-icons';
import {
	PiFilePdfFill,
	PiFileCsvFill,
	PiFileXlsFill,
	PiFilePngFill,
	PiFileJpgFill,
	PiFileFill
} from 'react-icons/pi';
import RetryDownload from './RetryDownload';
import DownloadStatus from './DownloaderStatus';
import { FileType, SelectedFile } from '../interfaces';

type DownloadItemProps = {
	file: SelectedFile;
};

const fileTypeIcons: Record<FileType, IconType> = {
	pdf: PiFilePdfFill,
	csv: PiFileCsvFill,
	xlxs: PiFileXlsFill,
	png: PiFilePngFill,
	jpg: PiFileJpgFill
};

const DownloadItem: React.FC<DownloadItemProps> = ({ file }) => {
	const { name, status, type } = file;

	const FileIcon = fileTypeIcons[type] || PiFileFill;

	return (
		<li
			className='file-item'
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '.7rem 1rem',
				fontSize: 16
			}}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
				<FileIcon size={24} />
				<div style={{ textAlign: 'left' }}>
					<p
						style={{
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							maxWidth: 300
						}}>
						{status === 'error' ? (
							<>
								<strong>Error de descarga:</strong> {name}
							</>
						) : (
							name
						)}
					</p>
					{(status === 'downloading' || status === 'error') && (
						<RetryDownload file={file} />
					)}
				</div>
			</div>

			<DownloadStatus status={status} />
		</li>
	);
};

export default DownloadItem;
