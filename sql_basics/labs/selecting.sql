-- [Lab] Selecting

-- Using data from this morning's lesson, write the following SQL Queries:

-- From the students table:
-- 1.  Select the first 10 students whose ages are between 35 and 45.
SELECT id, first_name, last_name, age 
FROM students 
WHERE age
BETWEEN 35 AND 45
LIMIT 10; 

-- 2.  Select the third set of 10 students whose ages are more than 25 and whose first names contain `le`. The students must be ordered by their id in ascending order then first name in a descending order.
SELECT id, first_name, last_name, age 
FROM students 
WHERE age > 25 AND last_name ILIKE '%le%'
ORDER BY id, first_name aSC
LIMIT 10 OFFSET 20;

-- 3.  Select the 10 oldest students (You should ignore students with an age that is `NULL`).
SELECT id, first_name, last_name, age 
FROM students
WHERE age IS NOT NULL
-- WHERE age{SELECT max(age) FROM students}
ORDER BY age DESC
LIMIT 10;

-- 4.  Select all students with age 45 whose last names contain the letter n.
SELECT id, first_name, last_name, age 
FROM students
WHERE age = 45 AND last_name ILIKE '%n%';


-- From the products table:
-- 1.  Select all the products that are on sale.
Select id, name, price, sale_price, remaining_quantity
FROM products
WHERE sale_price != price
ORDER BY sale_price ASC;

-- 2.  Select all the products that are on sale and have remaining items in stock ordered by the sale price in ascending order.
Select id, name, price, sale_price, remaining_quantity
FROM products
WHERE sale_price != price AND remaining_quantity > 0
ORDER BY sale_price ASC;

-- 3.  Select all the products priced between 25 and 50 (regular price) and that are on sale.
Select id, name, price, sale_price, remaining_quantity
FROM products
WHERE sale_price != price AND price BETWEEN 25 AND 50
ORDER BY sale_price ASC;

