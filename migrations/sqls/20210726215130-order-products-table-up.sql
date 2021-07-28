CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    products_id bigint REFERENCES products(id)
)