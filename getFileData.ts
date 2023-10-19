import { imageBase64_1 } from './imageBase64_1';
import { imageBase64_2 } from './imageBase64_2';

const URL_MAP = {
	1: 'https://s3.amazonaws.com/app.evx.cl/static/templates/email-list-example.csv',
	2: imageBase64_1,
	3: imageBase64_2,
	4: 'https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg'
};

export const getFileData = (id: number): Promise<string> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const url = URL_MAP[id as keyof typeof URL_MAP];
			if (url) {
				resolve(url);
			} else {
				reject(new Error('ID no válido'));
			}
		}, 2000);
	});
};
