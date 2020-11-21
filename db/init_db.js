// code to build and initialize DB goes here
const {
	client
	// other db methods
} = require('./index');

const { createProducts } = require('./products');
// const { createUsers } = require('./users');
// const { createOrders } = require('./orders');

async function buildTables() {
	try {
		await client.connect();

		// drop tables in correct order
		console.log('Dropping All Tables...');

		await client.query(`
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
            imageURL VARCHAR(255) DEFAULT 'no image',
            "inStock" BOOLEAN DEFAULT false,
            category VARCHAR(255) NOT NULL
            );

            CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            imageURL VARCHAR(255) DEFAULT 'no image',
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
            );

            CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            status VARCHAR(255) DEFAULT 'created',
            "userId" INTEGER REFERENCES users(id),
            "datePlaced" DATE
            );

            CREATE TABLE order_products(
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id),
            "orderId" INTEGER REFERENCES orders(id),
            price NUMERIC(10,2) NOT NULL,
            quantity NUMERIC(10,2) DEFAULT 0 NOT NULL
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
			name: 'ground beef',
			description: '85% lean, 15% fat all natural ground beef',
			price: '8.99',
			imageurl: 'null',
			inStock: true,
			category: 'beef'
		});
		const chicken = await createProducts({
			name: 'chicken breast',
			description: '100% organic chicken breast',
			price: '5.99',
			imageurl: 'null',
			inStock: true,
			category: 'poultry'
		});
		const pork = await createProducts({
			name: 'pork chops',
			description: 'Bone in pork chop',
			price: '4.99',
			imageurl: 'null',
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

async function createInitialUsers() {
	console.log('Starting to create users...');
	try {
		await createUsers({
			firstname: 'Anthony',
			lastname: 'Hertado',
			email: 'ahertado510@gmail.com',
			imageurl: 'http://www.pennlalsa.org/uploads/1/3/4/8/13489220/current-anthony-headshot_orig.png',
			username: 'The Sultan of Steaks'
		});
		await createUsers({
			firstname: 'Martin',
			lastname: 'Phillips',
			email: 'phillipsconstruction@gmail.com',
			imageurl: 'https://www.thomharrisdesign.com/wp-content/uploads/2011/06/Phillips-Construction-blog-500x384.jpg',
			username: 'Hammer-Time'
		});
		await createUsers({
			firstname: 'Jessie',
			lastname: 'Nguyen',
			email: 'lockjessmonster@gmail.com',
			imageurl: 'https://static.standard.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2014/10/27/11/lochnessmonster2710a.jpg',
			username: 'tinker-tailor'
		});

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
		await createOrders({
			status: 'Pending',
			userId: '1',
			datePlaced: '11/21/2020'
			
		});
		await createOrders({
			status: 'Delivered',
			userId: '3',
			datePlaced: '11/18/2020'
			
		});
		await createOrders({
			status: 'return',
			userId: '2',
			datePlaced: '11/15/2020'
			
		});
		console.log('Orders created:');
		console.log('Finished creating Orders!');
	} catch (error) {
		console.error('Error creating Orders!');
		throw error;
	}
}

async function populateInitialData() {
	try {
		await createInitialProducts();
		await createInitialUsers();
		await createInitialOrders();
		// create useful starting data
	} catch (error) {
		throw error;
	}
}

buildTables()
	.then(populateInitialData)
	.catch(console.error)
	.finally(() => client.end());
