const { client } = require('./index');

const getProductsforOrders = async id => {
	try {
		const { rows: products } = await client.query(
			`select products.*, order_products.price, order_products.quantity from products
            JOIN order_products ON products.id = order_products."productId"
            JOIN orders ON order_products."orderId" = orders.id 
            where orders.id = $1`,
			[id]
		);
		return products;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getAllOrders = async () => {
	try {
		const { rows: orders } = await client.query(`select * from orders`);

		const ordersWithProducts = await Promise.all(
			orders.map(async order => {
				order.products = await getProductsforOrders(order.id);
				return order;
			})
		);
		return ordersWithProducts;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getOrderById = async ({ id }) => {
	try {
		const {
			rows: orders
		} = await client.query(`select * from orders where id = $1`, [id]);

		const ordersWithProducts = await Promise.all(
			orders.map(async order => {
				order.products = await getProductsforOrders(order.id);
				return order;
			})
		);
		return ordersWithProducts;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getOrderByUsername = async ({ username }) => {
	try {
		const { rows: orders } = await client.query(
			`select orders.* from orders 
            JOIN users on orders."userId" = users.id
            where username = $1`,
			[username]
		);

		const ordersWithProducts = await Promise.all(
			orders.map(async order => {
				order.products = await getProductsforOrders(order.id);
				return order;
			})
		);
		return ordersWithProducts;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getOrderByProduct = async ({ id }) => {
	try {
		const { rows: orders } = await client.query(
			`select orders.* from orders 
            JOIN order_products on orders.id = order_products."orderId"
            where "productId" = $1`,
			[id]
		);

		const ordersWithProducts = await Promise.all(
			orders.map(async order => {
				order.products = await getProductsforOrders(order.id);
				return order;
			})
		);
		return ordersWithProducts;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getCartByUser = async id => {
	try {
		const { rows: orders } = await client.query(
			`select * from orders 
            where "userId" = $1
            and status = 'created'`,
			[id]
		);

		const ordersWithProducts = await Promise.all(
			orders.map(async order => {
				order.products = await getProductsforOrders(order.id);
				return order;
			})
		);
		return ordersWithProducts;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const createOrder = async (status, id) => {
	try {
		const {
			rows: [orders]
		} = await client.query(
			`insert into orders(status, "userId") values($1, $2) RETURNING *;`,
			[status, id]
		);
		return orders;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = {
	getAllOrders,
	getOrderById,
	getOrderByUsername,
	getOrderByProduct,
	getCartByUser,
	createOrder
};
