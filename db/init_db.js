// code to build and initialize DB goes here
const {
	client
	// other db methods
} = require('./index');

const { createProducts } = require('./products');
const { createUser } = require('./users');
const { addReview, createReview } = require('./reviews');
const { createOrder } = require('./orders');
const { addProductToOrder } = require('./order_products');

async function buildTables() {
	try {
		await client.connect();

		// drop tables in correct order
		console.log('Dropping All Tables...');

		await client.query(`
			DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS order_products;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS users;
			DROP TABLE IF EXISTS products;
			
            `);

		console.log('Finished dropping tables!');

		// build tables in correct order
		console.log('Starting to build tables...');

		await client.query(`
            CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            imageURL VARCHAR(255) DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
            "inStock" BOOLEAN DEFAULT false,
			category VARCHAR(255) NOT NULL,
			reviews VARCHAR(255) DEFAULT NULL
            );

            CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            imageURL VARCHAR(255) DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
            );

            CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            status VARCHAR(255) DEFAULT 'created',
            "userId" INTEGER REFERENCES users(id),
            "datePlaced" Timestamp DEFAULT NOW()
            );

            CREATE TABLE order_products(
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id),
            "orderId" INTEGER REFERENCES orders(id),
            price NUMERIC(10,2) NOT NULL,
			quantity NUMERIC(10,2) DEFAULT 0 NOT NULL
			
			);
			
			CREATE TABLE reviews(
				id SERIAL PRIMARY KEY,
				content VARCHAR(255) DEFAULT null, 
				"userId" INTEGER REFERENCES users(id),
				"productId" INTEGER references products(id)
			);
        `);

		console.log('Finished constructing tables!');
	} catch (error) {
		console.error('Error constructing tables!');
		throw error;
	}
}

async function createInitialProducts() {
	console.log('Starting to create products...');
	try {
		const beef = await createProducts({
			name: 'Steak',
			description: 'Great Marbling',
			price: '8.99',
			imageurl: 'https://i.ytimg.com/vi/GI4iAcTA9KY/maxresdefault.jpg',
			inStock: true,
			category: 'beef'
		});
		const chicken = await createProducts({
			name: 'chicken breast',
			description: '100% organic chicken breast',
			price: '5.99',
			imageurl: 'https://cdn.mos.cms.futurecdn.net/gfSKxAQ8ZCoknoctJgFDZa.jpg',
			inStock: true,
			category: 'poultry'
		});
		const pork = await createProducts({
			name: 'pork chops',
			description: 'Bone in pork chop',
			price: '4.99',
			imageurl: 'https://porterandyork.com/wp-content/uploads/Pork-Chop-e1540411361635.jpg',
			inStock: true,
			category: 'pork'
		});

		console.log('Products created:');
		console.log(beef, chicken, pork);
		console.log('Finished creating Products!');
	} catch (error) {
		console.error('Error creating Products!');
		throw error;
	}
}

async function createInitialReviews() {
	console.log('Starting to create Reviews...');
	try {
		const newReview = await createReview({ productId : 1, content : "My family can't get enough" , userId : 2})	

		console.log('Review created:');
		console.log(newReview);
		console.log('Finished creating Reviews!');
	} catch (error) {
		console.error('Error creating Reviews!');
		throw error;
	}
}

async function createInitialUsers() {
	console.log('Starting to create users...');
	try {
		const anthony = await createUser({
			firstName: 'Anthony',
			lastName: 'Hertado',
			email: 'ahertado510@gmail.com',
			imageUrl: 'http://www.pennlalsa.org/uploads/1/3/4/8/13489220/current-anthony-headshot_orig.png',
			username: 'The Sultan of Steaks',
			password : 'albatross311',
			isAdmin : 'false'
		});
		const martin = await createUser({
			firstName: 'Martin',
			lastName: 'Phillips',
			email: 'phillipsconstruction@gmail.com',
			imageUrl: 'https://www.thomharrisdesign.com/wp-content/uploads/2011/06/Phillips-Construction-blog-500x384.jpg',
			username: 'Hammer-Time',
			password: 'nailedit',
			isAdmin : 'false'
		});
		const jessie = await createUser({
			firstName: 'Jessie',
			lastName: 'Nguyen',
			email: 'lockjessmonster@gmail.com',
			imageUrl: 'https://static.standard.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2014/10/27/11/lochnessmonster2710a.jpg',
			username: 'tinker-tailor',
			password: 'mossy+bossy',
			isAdmin: 'true'
		});
		console.log(anthony, martin, jessie)
		console.log('Users created:');
		console.log('Finished creating Users!');
	} catch (error) {
		console.error('Error creating Users!');
		throw error;
	}
}

async function createInitialOrders() {
	console.log('Starting to create orders...');
	try {
		const pending = await createOrder(
			'Pending',
			1
		);
		const delivered = await createOrder(
			'Delivered',
			3
		);
		const returnOrder = await createOrder(
			'return',
			2
		);
		console.log(pending, delivered, returnOrder )
		console.log('Orders created:');
		console.log('Finished creating Orders!');
	} catch (error) {
		console.error('Error creating Orders!');
		throw error;
	}
}

async function createInitialOrderProducts() {
	console.log('Starting to create order_products...');
	try {
		const order1 = await addProductToOrder({
			orderId: 1, 
			productId: 1, 
			price: 8.99,
			quantity: 1
		});
		const order2 = await addProductToOrder({
			orderId: 2, 
			productId: 2, 
			price: 8.98,
			quantity: 1.5
		});
		const order3 = await addProductToOrder({
			orderId: 3, 
			productId: 3, 
			price: 9.98,
			quantity: 2
		});
		console.log(order1, order2, order3 )
		console.log('order_products created:');
		console.log('Finished creating order_products!');
	} catch (error) {
		console.error('Error creating order_products!');
		throw error;
	}
}

async function populateInitialData() {
	try {
		await createInitialProducts();
		await createInitialUsers();
		await createInitialOrders();
		await createInitialOrderProducts();
		await createInitialReviews();
		// create useful starting data
	} catch (error) {
		throw error;
	}
}

buildTables()
	.then(populateInitialData)
	.catch(console.error)
	.finally(() => client.end());
