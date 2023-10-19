export type FileType = 'pdf' | 'csv' | 'xlxs' | 'png' | 'jpg';
export type FileStatus = 'downloading' | 'downloaded' | 'error';

export interface FileDownload {
	id: number;
	name: string;
	type: FileType;
	urlToDownload: string;
}

export interface SelectedFile extends FileDownload {
	status: FileStatus;
}
