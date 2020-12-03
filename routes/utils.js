const requireUser = (req, res, next) => {
	if (!req.user) {
		return next({
			name: 'Not authorized',
			message: 'User must be logged in to perform this action'
		});
	} else {
		console.log('User is authorized');
		return next();
	}
};

const requireAdmin = (req, res, next) => {
	console.log(req.user);

	if (!req.user) {
		return next({
			name: 'Not authorized',
			message: 'User must be logged in to perform this action'
		});
	} else if (!req.user.isAdmin) {
		return next({
			name: 'Not authorized',
			message: 'User must be an admin to perform this action'
		});
	} else {
		console.log('User is authorized');
		return next()
	}
};

module.exports = { requireUser, requireAdmin };
