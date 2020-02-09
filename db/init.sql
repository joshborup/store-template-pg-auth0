DROP TABLE IF EXISTS line_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	email TEXT NOT NULL,
	admin BOOLEAN NOT NULL DEFAULT false,
	date_joined TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email, admin)
VALUES 
('joshborup@gmail.com', true),
('test@gmail.com', false);


CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	product_name TEXT NOT NULL,
	price FLOAT NOT NULL,
	description TEXT NOT NULL,
	quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, price, description, quantity)
VALUES ('pothos in wine bottle', '15.00', 'a pothos plant in a wine bottle', 5), ('fern in water bottle', '18.00', 'a fern in a glass water bottle', 2);

CREATE TABLE orders (
	order_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(user_id)
);

INSERT INTO orders (user_id) VALUES (1), (2);

CREATE TABLE line_items (
	line_item_id SERIAL PRIMARY KEY,
	order_id INTEGER REFERENCES orders(order_id),
	product_id INTEGER REFERENCES products(product_id)
);

INSERT INTO line_items (order_id, product_id)
VALUES (1, 1), (2, 1), (2, 2);