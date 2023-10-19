import { IconType } from 'react-icons';
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
	MdOutlineClose
} from 'react-icons/md';

type DownloaderHeaderProps = {
	isOpen: boolean;
	toggleOpen: () => void;
	isDownloading: boolean;
	isGeneratingFile: boolean;
	countDownloadingFiles: number;
	countDownloadedFiles: number;
};

const DownloaderHeader: React.FC<DownloaderHeaderProps> = props => {
	const {
		isOpen,
		toggleOpen,
		isDownloading,
		isGeneratingFile,
		countDownloadingFiles,
		countDownloadedFiles
	} = props;

	const ArrowIcon: IconType = isOpen ? MdKeyboardArrowDown : MdKeyboardArrowUp;

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				backgroundColor: '#201D42',
				gap: 50,
				lineHeight: 'normal',
				borderRadius: '15px 15px 0 0',
				minWidth: 350,
				padding: '1rem',
				userSelect: 'none'
			}}>
			<p style={{ fontWeight: 700 }}>
				{isGeneratingFile
					? 'Preparando la descarga'
					: isDownloading
					? `Descargando archivos (${countDownloadingFiles})`
					: `Descargas (${countDownloadedFiles})`}
			</p>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginLeft: 'auto',
					gap: 10
				}}>
				<ArrowIcon
					onClick={toggleOpen}
					size={24}
					style={{ cursor: 'pointer' }}
				/>
				<MdOutlineClose
					onClick={() => {}}
					size={20}
					style={{ cursor: 'pointer' }}
				/>
			</div>
		</div>
	);
};

export default DownloaderHeader;
