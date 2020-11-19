import axios from 'axios';
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = `/api`;

export const callApi = async ({ path, method, token }, body = null) => {
	const axiosConfig = {
		url: `${BASE_URL + path}`,
		method: `${method}`,
		data: body
	};

	if (token) {
		axiosConfig.headers = { Authorization: `Bearer ${token}` };
	}

	try {
		const { data } = await axios(axiosConfig);
		return data;
	} catch (error) {
		console.error(error);
	}
};
