import { IconType } from 'react-icons';
import { MdDownloading, MdCheck, MdClose } from 'react-icons/md';
import { FileStatus } from '../interfaces';

type DownloadStatusProps = {
	status: FileStatus;
};

const fileStatusIcons: Record<FileStatus, IconType> = {
	downloading: MdDownloading,
	downloaded: MdCheck,
	error: MdClose
};

const fileStatusColors: Record<FileStatus, string> = {
	downloading: 'transparent',
	downloaded: '#349F23',
	error: '#B81C1D'
};

const DownloadStatus: React.FC<DownloadStatusProps> = ({ status }) => {
	const StatusIcon = fileStatusIcons[status];
	const statusColor = fileStatusColors[status];

	return (
		<div
			style={{
				marginLeft: 20,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: statusColor,
				borderRadius: '50%'
			}}>
			<StatusIcon color='#D7D6DA' size={16} />
		</div>
	);
};

export default DownloadStatus;
