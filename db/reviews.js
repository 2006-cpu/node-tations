const { client } = require('./index');

const getAllReviews = async () => {
	try {
		const { rows: products } = await client.query(`select *
		from products
		`);

		console.log(products)
		return products;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const addReview = async (productId, fields = {}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    
    
    if (setString.length === 0) {
		return;
	};
    
	try {
        const { rows: newReview } = await client.query(`UPDATE products
        SET ${ setString }
        where id=${productId}
        RETURNING *;
		`, Object.values(fields) );

		console.log(newReview)
		return newReview;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = { getAllReviews, addReview }