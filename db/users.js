const { client } = require('./index');
const { hash, compare } = require('bcrypt');

const createUser = async ({ username, password }) => {
	try {
		const hashedPass = await hash(password, 10);

		const {
			rows: [newUser]
		} = await client.query(
			`insert into users(username, password) values($1, $2) returning *`,
			[username, hashedPass]
		);

		delete newUser.password;

		return newUser;
	} catch (error) {
		throw error;
	}
};

const getUserByUsername = async username => {
	try {
		const {
			rows: [user]
		} = await client.query(
			'select username, password, id from users where username = $1',
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
		const hashedPass = user.password;
		const match = await compare(password, hashedPass);

		if (match) {
			delete user.password;
			return user;
		}
	} catch (error) {
		throw error;
	}
};

const getUserById = async userId => {
	try {
		const {
			rows: [user]
		} = await client.query(`select username, id from users where id = $1`, [
			userId
		]);

		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = { createUser, getUser, getUserById, getUserByUsername };
