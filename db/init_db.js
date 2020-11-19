// code to build and initialize DB goes here
const {
	client
	// other db methods
} = require('./index');

const { createProducts } = require('./products');

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

async function populateInitialData() {
	try {
		await createInitialProducts();
		// create useful starting data
	} catch (error) {
		throw error;
	}
}

buildTables()
	.then(populateInitialData)
	.catch(console.error)
	.finally(() => client.end());
