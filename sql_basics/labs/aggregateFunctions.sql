-- [Lab] Aggregate Functions

-- Using the data from this morning's lesson, write the following SQL Queries:

-- From the students table:
-- 1.  Find the number of students named 'Elinore'.
SELECT count(*) AS number_of_Elinores
FROM students
WHERE first_name = 'Elinore'
GROUP BY first_name;

-- 2.  List the `first_name`s that occur more than once in students, with the number occurrences of that name.
SELECT first_name, occurrences
FROM occurrences = (SELECT first_name, COUNT(*) AS occurences FROM students GROUP BY first_name)
WHERE occurences > 1
GROUP BY first_name
ORDER BY  occurrences DESC, first_name ASC;

-- does same as above
SELECT first_name, occurences
FROM (
    SELECT first_name, COUNT(*) as occurences
    FROM students
    GROUP BY first_name
    ) AS students
WHERE occurences > 1
ORDER BY occurences DESC, first_name ASC;

-- 3.  Refine the above query to list the 20 most common first_names among students, in order first of how common they are, and alphabetically when names have the same count.
SELECT first_name, count(*) AS occurences
FROM students
GROUP BY first_name
ORDER BY occurences DESC, first_name ASC
LIMIT 20;


-- From the products table:
-- 1.  Find the most expensive product.
SELECT id, name, price, sale_price, remaining_quantity
FROM products
WHERE sale_price = (SELECT sale_price 
                    FROM products 
                    ORDER BY sale_price DESC 
                    LIMIT 1)
ORDER BY sale_price;

-- 2.  Find the cheapest product that is on sale.
SELECT id, name, price, sale_price, remaining_quantity
FROM products
WHERE remaining_quantity > 0 AND sale_price = (SELECT MIN(sale_price) 
                                               FROM products)
ORDER BY sale_price, price DESC;


-- 3.  Find the total value of all inventory in stock (use sale price).
SELECT SUM(sale_price * remaining_quantity) AS total_inventory_value
FROM products;

