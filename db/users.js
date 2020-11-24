const { client } = require('./index');
const { hash, compare } = require('bcrypt');

const createUser = async ({
	firstName,
	lastName,
	email,
	imageUrl,
	username,
	password,
	isAdmin
}) => {
	try {
		const hashedPass = await hash(password, 10);

		const {
			rows: [newUser]
		} = await client.query(
			`insert into users(firstname, lastname, email, imageURL, username, password, "isAdmin") values($1, $2, $3, $4, $5, $6, $7) returning *`,
			[
				firstName,
				lastName,
				email,
				imageUrl,
				username,
				hashedPass,
				isAdmin
			]
		);

		delete newUser.password;

		return newUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getUserByUsername = async username => {
	try {
		const {
			rows: [user]
		} = await client.query(
			'select username, password, id, "isAdmin" from users where username = $1',
			[username]
		);

		return user;
	} catch (error) {
		throw error;
	}
};

const getUser = async ({ username, password }) => {
	try {
		const user = await getUserByUsername(username);

		if (!user) {
			throw Error('A user by that username does not exist');
		}

		const hashedPass = user.password;
		const match = await compare(password, hashedPass);

		if (match) {
			delete user.password;
			return user;
		} else {
			throw Error('Wrong password');
		}
	} catch (error) {
		throw error;
	}
};

const getUserById = async userId => {
	try {
		const {
			rows: [user]
		} = await client.query(
			`select username, id, "isAdmin" from users where id = $1`,
			[userId]
		);

		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = { createUser, getUser, getUserById, getUserByUsername };
