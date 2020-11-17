const { client } = require('./index');

const getProductById = async id => {
	if (typeof id !== 'number') {
		throw Error('Invalid id');
	}

	try {
		const product = await client.query(
			`select * from products where id = $1`,
			[id]
		);
		return product;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getAllProducts = async () => {
	try {
		const products = await client.query(`select * from products`);
		return products;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const createProducts = async product => {
	// Field length validation
	if (Object.keys(product).length !== 6) {
		throw Error('Missing fields');
	}

	try {
		const newProduct = await client.query(
			`insert into products(name, description, price, imageurl, "inStock", category) values($1, $2, $3, $4, $5, $6)`,
			[Object.values(product)]
		);
		return newProduct;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = {
	getProductById,
	getAllProducts,
	createProducts
}