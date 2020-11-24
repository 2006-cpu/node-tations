export const storeCurrentUser = user => {
	localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = () => {
	const user = JSON.parse(localStorage.getItem('currentUser'));
	return user;
};

export const storeCurrentUserToken = token => {
	localStorage.setItem('token', JSON.stringify(token));
};

export const getCurrentUserToken = () => {
	const token = JSON.parse(localStorage.getItem('token'));
	return token;
};

export const clearCurrentUser = () => {
	localStorage.removeItem('currentUser');
};

export const clearCurrentUserToken = () => {
	localStorage.removeItem('token');
};
