import { config } from './config.js';

class Api {
	static Fetch(endpoint, queryConfig = { params: {} }) {
		const headers = {
			'Content-Type': 'application/json',
		};

		let url = `${config.rootUrl}/${endpoint}?`;

		if (queryConfig.params) {
			Object.keys(queryConfig.params).forEach((key) => {
				url += `${key}=${queryConfig.params[key]}&`;
			});
		}

		url = url.substring(0, url.length - 1);

		return fetch(url, { method: 'GET' })
			.then(async (response) => {
				if (response.ok) {
					const responseData = await response.json();
					
					return [responseData, null];
				}

				return Promise.reject(new Error('Unknown Error'));
			})
			.catch((e) => {
				return Promise.reject(e);
			});
	}

}

export { Api };