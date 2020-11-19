const { client } = require('./index');

const getProductById = async id => {
	if (typeof id !== 'number') {
		throw Error('Invalid id');
	}

	try {
		const {
			rows: product
		} = await client.query(`select * from products where id = $1`, [id]);
		return product;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getAllProducts = async () => {
	try {
		const { rows: products } = await client.query(`select * from products`);
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
		const { rows: newProduct } = await client.query(
			`insert into products(name, description, price, imageurl, "inStock", category) values($1, $2, $3, $4, $5, $6) RETURNING *;`,
			Object.values(product)
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
};
