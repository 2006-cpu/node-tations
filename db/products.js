const { client } = require('./index');

const getProductById = async id => {
	if (typeof id !== 'number') {
		throw Error('Invalid id');
	}

	try {
		const {
			rows: [product]
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

const deleteProduct = async ({ id }) => {
	{   
		try{
			const {rows: order_products} = await client.query(`
			DELETE FROM order_products
			JOIN orders ON order_products."orderId" = orders.id
			WHERE "productId" = $1
			AND status <> 'completed'
		  `, [id]);
			console.log(order_products)
		  	const {rows: product} = await client.query(`
		  	DELETE FROM products
		  	WHERE id = $1
			`, [id]);
	
			return product
		}
		catch (error) 
		{
			console.error(error);
			throw error;
		};
	};
};	

async function updateProduct(id, fields = {}) {
	// build the set string
	const setString = Object.keys(fields).map(
	  (key, index) => `"${ key }"=$${ index + 1 }`
	).join(', ');

	// return early if this is called without fields
	if (setString.length === 0) {
		return;
		};

	try {
        const {
			rows: product
		} = await client.query(
            `UPDATE products
            SET ${ setString }
            WHERE id ${ id }
            RETURNING *;`,
			Object.values(fields)
		);
		return product;
        
    } catch (error) {
        console.error(error);
		throw error;    
    };
};



module.exports = {
	getProductById,
	getAllProducts,
	createProducts,
	deleteProduct,
	updateProduct
};
