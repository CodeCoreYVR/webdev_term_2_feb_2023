-- Creat table
CREATE TABLE cars (
    id SERIAL,
    make VARCHAR(50),
    model VARCHAR(50),
    doors INTEGER,
    description TEXT
);

--Alter table to add a column
ALTER TABLE students ADD COLUMN gender CHAR(1);

--Create: Insert a row
INSERT INTO students 
    (first_name, last_name, email, phone_number)
    VALUES
    ('Peter', 'Parker', 'peter@parker.com', '2323232323');

--Read: all columns. '*' represents all rows
SELECT * FROM students;

--Where clauses
SELECT * FROM students 
    WHERE id > 100;

SELECT first_name 
    FROM students
    WHERE registration_date >= (CURRENT_DATE - 1000);

SELECT first_name, last_name, age 
    FROM students 
    WHERE age>40 AND age<60;

SELECT first_name, last_name, age
    FROM students
    WHERE age IS NULL OR age < 20;

--Like and ILike
SELECT * 
    FROM students
    WHERE first_name Like 'Jo%';

SELECT * 
    FROM students
    WHERE first_name ILike 'jo%';

--between
SELECT first_name, age
    FROM students
    WHERE age between 25 and 35;

--Order by
SELECT age, first_name
    FROM students
    ORDER BY age, first_name ASC;

--Example
SELECT first_name, last_name, age
    FROM students
    WHERE first_name ILike 'jo%'
    ORDER BY last_name, age ASC;

--Exercise
SELECT first_name, last_name, age
    FROM students
    WHERE age > 30
    ORDER BY first_name, age ASC;


--Limit
SELECT first_name, last_name, age
    FROM students
    WHERE age > 30
    ORDER BY first_name, age ASC
    LIMIT 10;

--Exercise
SELECT first_name, last_name, age
    FROM students
    WHERE first_name ILike 'ke%'
    LIMIT 10;

--Offset
SELECT first_name, last_name, age
    FROM students
    WHERE age > 30
    ORDER BY first_name, age ASC
    LIMIT 10
    OFFSET 20;

--Count
SELECT count(first_name) AS student_count
    FROM students
    WHERE age > 25;

--Sum
SELECT sum(age) as total_years FROM students;

--AVG
select AVG(age) as average_age FROM students;

--Exercise (Small letter for sql keywords work, but it is not conventional)
select avg(age) as average_age 
    from students 
    Where registration_date > to_date('2017-01-01','YYYY-MM-DD');

--Round
select round(AVG(age)) as average_age FROM students;

--Min, Max, AVG, Sum
SELECT MIN(age), MAX(age), AVG(age), SUM(age) 
    FROM students;
    
SELECT MAX(age)
    FROM students
    WHERE first_name like 'J%';
    
SELECT first_name, count(first_name) as occurances
    FROM students
    GROUP BY first_name
    HAVING count(first_name) > 1;
    
--UPDATE
UPDATE students  SET first_name='tammam' 
    WHERE id=1;
    
select * from students where id=501;

delete from students where id=501;

select table_name from information_schema.tables where table_name ilike '%car%';

drop table cars;

    
    
    
    