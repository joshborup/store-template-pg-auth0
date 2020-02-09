SELECT * FROM users JOIN orders ON (users.user_id = orders.order_id)
JOIN line_items ON (orders.order_id = line_items.order_id)
JOIN products ON (products.product_id = line_items.product_id)
WHERE orders.order_id = 2;