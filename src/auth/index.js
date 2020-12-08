export const storeCurrentUser = user => {
	localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = () => {
	const user = JSON.parse(localStorage.getItem('currentUser'));
	return user;
};

export const clearCurrentUser = () => {
	localStorage.removeItem('currentUser');
};

export const storeCurrentUserToken = token => {
	localStorage.setItem('token', JSON.stringify(token));
};

export const getCurrentUserToken = () => {
	const token = JSON.parse(localStorage.getItem('token'));
	return token;
};

export const clearCurrentUserToken = () => {
	localStorage.removeItem('token');
};

export const storeCart = cart => {
	localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
	const token = JSON.parse(localStorage.getItem('cart'));
	return token;
};

export const clearCart = () => {
	localStorage.removeItem('cart');
};
