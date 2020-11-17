// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    // build tables in correct order
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      imageURL VARCHAR(255) NOT NULL DEFAULT null,
      "inStock" BOOLEAN DEFAULT false,
      category VARCHAR(255) NOT NULL
      )`)

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());