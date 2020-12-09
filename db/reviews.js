const { client } = require('./index');

const getAllReviews = async () => {
	try {
		const { rows: reviews } = await client.query(`select reviews.*, users.username
		from reviews
		JOIN users on users.id = reviews."userId"
		`);

		
		return reviews;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const addReview = async ({productId}, fields = {}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    
    
    if (setString.length === 0) {
		return;
	};
    
	try {
        const { rows: updatedReview } = await client.query(`UPDATE reviews
        SET ${ setString }
        where reviews."productId"=${productId}
        RETURNING *;
		`, Object.values(fields) );

		return updatedReview;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const createReview = async ({content , userId, productId }) => {
    
	try {
        const { rows: [newReview] } = await client.query(`insert into reviews (content, "userId", "productId" ) VALUES($1, $2, $3)
        RETURNING *;
		`, [content, userId, productId,]);
            
        const { rows : [user]} = await client.query(`SELECT reviews.* , users.username AS creatorName 
        FROM users
        JOIN reviews on reviews."userId"=users.id
        WHERE reviews."userId"=${userId}`)
		console.log(user)
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
module.exports = { getAllReviews, addReview, createReview }