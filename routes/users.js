const usersRouter = require('express').Router();
const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {
	createUser,
	getUserByUsername,
	getUser,
	getUserById,
	getAllUsers,
	updateUser
} = require('../db/users');
const { requireUser, requireAdmin } = require('./utils');

usersRouter.post('/register', async (req, res, next) => {
	const userFields = [
		'firstName',
		'lastName',
		'email',
		'username',
		'password'
	];

	if (req.body.password.length < 8) {
		return res.send({ success: false, message: 'Password is too short!' });
	}

	try {
		userFields.map(key => {
			if (!Object.keys(req.body).includes(key)) {
				throw Error('Missing fields');
			}
		});

		const checkUsername = await getUserByUsername(req.body.username);

		if (checkUsername) {
			return res.send({
				success: false,
				message: 'Username already exists!'
			});
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
			return res.send({
				success: false,
				message: 'Missing username or password!'
			});
		}

		const user = await getUser(req.body);

		if (user) {
			const token = sign(
				{ id: user.id, username: user.username, isAdmin: user.isAdmin },
				JWT_SECRET
			);

			res.send({
				success: true,
				message: 'You are logged in!',
				user,
				token
			});
		}
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
	const { id } = req.user;

	try {
		const user = await getUserById(id);
		res.send(user);
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

usersRouter.get('/', requireAdmin, async (req, res, next) => {
	try {
		const user = await getAllUsers();
		res.send(user);
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

usersRouter.patch('/:userId', requireAdmin, async (req, res, next) => {
	const { userId } = req.params;
	const id = Number(userId);

	try {
		const user = await updateUser(id, req.body);

		res.send(user);
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

usersRouter.get('/:userId', requireUser, async (req, res, next) => {
	const { userId } = req.params;
	const id = Number(userId);

	try {
		const user = await getUserById(id);
		res.send(user);
	} catch ({ name, message }) {
		res.send({ name, message });
	}
});

module.exports = { usersRouter };
