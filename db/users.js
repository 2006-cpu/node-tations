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
		} = await client.query(`select * from users where id = $1`, [userId]);
		delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
};

async function updateUser(id, fields = {}) {
	// build the set string
	const setString = Object.keys(fields)
		.map((key, index) => {if(key === 'imageURL'){
			return `${key}=$${index + 1}`
		} else
		{
			return `"${key}"=$${index + 1}`
		};
	}).join(', ');

		console.log(setString)
	// return early if this is called without fields
	if (setString.length === 0) {
		return;
	}
	try {
		//Hash the password
		if (fields.password) {
			const hashedPass = await hash(fields.password, 10);
			fields.password = hashedPass;
		}

		const { rows: user } = await client.query(
			`UPDATE users
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;`,
			Object.values(fields)
		);

		delete user.password;
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

const getAllUsers = async () => {
	try {
		const { rows: users } = await client.query(`select * from users`);
		return users;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = {
	createUser,
	getUser,
	getUserById,
	getUserByUsername,
	updateUser,
	getAllUsers
};
