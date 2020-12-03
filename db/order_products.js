const { client } = require('./index');


const getUserOrderProducts = async ({ id, orderProductId }) => {
	try {
        const { rows: product_orders } = await client.query
        (`select order_products.* FROM order_products JOIN
        orders on order_products."orderId" = orders.id
        where orders."userId" = $1 and "orders_products.id = $2`, [id, orderProductId]);
        
        return product_orders;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getOrderProductById = async (id, productId) => {
	try {
		const { rows: product_orders } = await client.query(`select * FROM order_products where "orderId" = $1 and "productId" = $2`, [id, productId]);
        
        return product_orders;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
    try {
        const {
			rows: product_orders
		} = await client.query(
			`insert into order_products("orderId", "productId", price, quantity) values($1, $2, $3, $4) RETURNING *;`,
			[orderId, productId, price, quantity]
		);
		return product_orders;
        
    } catch (error) {
        console.error(error);
		throw error;    
    }
}

const updateOrderProduct = async ({ id, price, quantity }) => {
    try {
        const {
			rows: product_orders
		} = await client.query(
            `UPDATE order_products
            SET price = $2, quantity = $3
            WHERE id = $1
            RETURNING *;`,
			[id, price, quantity]
		);
		return product_orders;
        
    } catch (error) {
        console.error(error);
		throw error;    
    }
}

async function destroyOrderProduct(id)
{   
    try{
        const {rows: order_products} = await client.query(`
        DELETE FROM order_products
        WHERE id = $1
        RETURNING *
      `, [id]);

        return order_products
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    };
};

module.exports = {
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct,
    getUserOrderProducts
};