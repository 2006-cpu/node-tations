const usersRouter = require('express').Router();
const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { createUser, getUserByUsername, getUser } = require('../db/users');

usersRouter.post('/register', async (req, res, next) => {
	const userFields = [
		'firstName',
		'lastName',
		'email',
		'username',
		'password'
	];

	try {
		userFields.map(key => {
			if (!Object.keys(req.body).includes(key)) {
				throw Error('Missing fields');
			}
		});

		const checkUsername = await getUserByUsername(req.body.username);

		if (checkUsername) {
			throw Error('Username is not available');
		}

		const newUser = await createUser(req.body);

		const token = sign(
			{
				id: newUser.id,
				user: newUser.username,
				isAdmin: newUser.isAdmin
			},
			JWT_SECRET
		);

		res.send({ message: 'success', newUser, token });
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

usersRouter.post('/login', async (req, res, next) => {
	const { username, password } = req.body;

	try {
		if (!username || !password) {
			throw Error('Missing fields');
		}

		const user = await getUser(req.body);

		if (user) {
			const token = sign(
				{ id: user.id, username: user.username, isAdmin: user.isAdmin },
				JWT_SECRET
			);

			res.send({ message: 'You are logged in', user, token });
		}
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

usersRouter.get('/me', async (req, res, next) => {
	const { username } = req.body;
	const { token } = req.headers;

	try {
		const user = await usersMe(username, token);

		if (user) localStorage.setItem('token', JSON.stringify(user));
		console.log('products:', products);
		res.send({
			user: user
		});
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

module.exports = { usersRouter };
