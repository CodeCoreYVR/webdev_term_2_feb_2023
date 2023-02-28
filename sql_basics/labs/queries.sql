-- [Lab] Queries

-- Using data from this morning's lesson, write the following SQL Queries:

-- For the products table:
-- 1.  Select the product whose stock has the most value (use sale price)
SELECT id, name, price, sale_price, remaining_quantity
FROM products
-- WHERE sale_price{SELECT max(sale_price) FROM products}
ORDER BY sale_price DESC
LIMIT 1;

-- 2.  Select the most expensive product whose price is between 25 and 50 with remaining quantity
SELECT id, name, price, sale_price, remaining_quantity
FROM products
WHERE remaining_quantity > 0 AND price BETWEEN 25 AND 50
ORDER BY sale_price DESC
LIMIT 1;

-- 3.  Select all products on sale with remaining quantity ordered by their price and then their name
SELECT id, name, price, sale_price, remaining_quantity
FROM products
WHERE remaining_quantity > 0 and sale_price != price
ORDER BY sale_price, name ASC;

-- 4.  Select the second set 20 results based on the previous query
SELECT id, name, price, sale_price, remaining_quantity
FROM products
WHERE remaining_quantity > 0 and sale_price != price
ORDER BY sale_price, name
LIMIT 20
OFFSET 20;

-- 5.  Find the average price of all products
SELECT AVG(price) AS average_price
FROM products;

-- 6.  Find the average sale_price of all products that are on sale
SELECT AVG(sale_price) AS average_sale_price
FROM products
WHERE sale_price < price;

-- 7.  Find the average price of all products that are on sale with remaining quantity
SELECT AVG(sale_price) AS average_sale_price
FROM products
WHERE sale_price < price AND remaining_quantity > 0;

-- 8.  Update all the products whose name contains `paper` (case insensitive) to have a remaining quantity of 0
UPDATE products 
SET remaining_quantity = 0 
WHERE name ILIKE '%paper%';

-- 9.  Update all the products whose name contains `paper` or `steel` to have a remaining quantity of a random number between 5 and 25
UPDATE products
SET remaining_quantity = FLOOR(RANDOM()*20 + 5)
WHERE name ILIKE '%paper%' OR name ILIKE '%steel%';

-- For checking --
-- SELECT id, name, price, sale_price, remaining_quantity
-- FROM products
-- WHERE name ILIKE '%paper%' OR name ILIKE '%steel%'
-- AND remaining_quantity BETWEEN 5 AND 25;

-- 10.  Select the second set of 10 cheapest products (by `price` or `sale_price`) with remaining quantity
SELECT id, name, price, sale_price, remaining_quantity
FROM products
WHERE remaining_quantity > 0
ORDER BY sale_price ASC
LIMIT 10 OFFSET 10;

-- 11.  Build a query that groups the products by their sale price and show the number of products in that price and the sum of remaining quantity. Label the count `product_count`
SELECT id, name, sale_price, remaining_quantity, remaining_quantity * sale_price 
AS product_count
FROM products
ORDER BY product_count DESC;

-- 12.  [stretch] Update the most expensive product to have double its quantity in a single query
UPDATE products 
SET remaining_quantity = remaining_quantity * 2
WHERE id = (SELECT id 
            FROM products 
            ORDER BY sale_price DESC 
            LIMIT 1);

--------Below Code Is Just To Test Question 12--------
-- SELECT id, name, sale_price, remaining_quantity
-- FROM products
-- ORDER BY sale_price DESC;


