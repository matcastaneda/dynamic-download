import { PiFileDashedFill } from 'react-icons/pi';
import { MdDownloading } from 'react-icons/md';

const GeneratingFile = () => {
	return (
		<li
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '.7rem 1rem'
			}}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 10
				}}>
				<PiFileDashedFill size={24} />
				<p style={{ fontSize: 16 }}>Generando archivo...</p>
			</div>

			<div style={{ display: 'flex', marginLeft: 20 }}>
				<MdDownloading color='#D7D6DA' size={18} />
			</div>
		</li>
	);
};

export default GeneratingFile;
