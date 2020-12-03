const { client } = require('./index');

const getProductsforOrders = async id => {
	try {
		const { rows: products } = await client.query(
			`select products.*, order_products.price, order_products.quantity from products
            JOIN order_products ON products.id = order_products."productId"
            JOIN orders ON order_products."orderId" = orders.id 
            where products.id = $1`,
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
			orders.map(async (order) => {
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
		const { rows: orders } = await client.query(
			`select * from orders where id = $1`,
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

const getCartByUser = async ({ id }) => {
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

const createOrder = async ({status, id}) => {
	try {
		const {
			rows: orders
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

const updateOrder = async (id, fields = {}) => {

	const setString = Object.keys(fields).map(
		(key, index) => `"${ key }"=$${ index + 1 }`
	  ).join(', ');

	  if (setString.length === 0) {
		return;
		};

	try {
		
		const {
			rows: [updatedOrder] 
		} = await client.query(
			`UPDATE orders 
			SET ${setString}
			WHERE id = ${id}
			RETURNING *`,
			Object.values(fields)
		);
		return updatedOrder;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const completeOrder = async ({id, status}) => {

	try {
		const {
			rows: completedOrder
		} = await client.query(
			`UPDATE orders 
			WHERE id = $1
			RETURNING ${status === 'complete'}`,
			[id]
		);
		return completedOrder;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const cancelOrder = async ({id, status}) => {

	try {
		const {
			rows: cancelledOrder
		} = await client.query(
			`UPDATE orders 
			WHERE id = $1
			RETURNING ${status === 'cancelled'}`,
			[id]
		);
		return cancelledOrder;
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
	createOrder,
	updateOrder,
	completeOrder,
	cancelOrder
};
