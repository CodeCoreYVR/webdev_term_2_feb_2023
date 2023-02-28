-- Table: Employpee
-- id, Name, DOB, Address 
-- 1, John Doe, 16-May-1997, 4
-- 2, Lex De-haan, 05-Mar-1995, 2
-- 3, Chris Chan, 18-Oct-1992, 3
-- 4, Barron Morris, 16-May-1997, 1

-- Table: Address
-- Id, Apt/Suit, Street Name, City, Province
-- 1, 201, 459 Main St, 2, 1
-- 2, 100, 99 Dalhousie Drive, 1, 2
-- 3, 208, 56 Celtic Bay, 1, MB
-- 4, 108, 38 Wascana Road, 2, 1

-- Table: City
-- Id, Name
-- 1, Brandon
-- 2, Regina
-- 3, Vancouver
-- 4, London
-- 5, Richmond

-- Table: Province
-- Id, Name
-- 1, SK
-- 2, MB
-- 3, BC
-- 5, ON

-- Country
-- id, name
-- 1, USA
-- 2, UK
-- 3, CA

-- Table:Site
-- City, Province
-- 3, 1
-- 3, 3
-- 5, 1
-- 5, 3
-- 4, 2
-- 4, 3

-- One-to-One: Employpee & Address
-- One-to-Many: Address & City/Province
-- Many-to-Many: City & Country

-- DEMOS:


-- STUDENT PROJECTS

SELECT title FROM projects WHERE student_id=2;

-- COURSE SCORES

SELECT student_id, score FROM enrolments WHERE course_id = 1;

-- CROSS JOIN
-- STUDENTS WITH PROJECTS

SELECT * FROM students CROSS JOIN projects;

-- INNER JOIN
SELECT * FROM students INNER JOIN projects ON students.id = projects.student_id; 
-- FIRST JOIN

SELECT * FROM students INNER JOIN projects ON students.id = projects.student_id 
ORDER BY students.first_name;

-- WHATS PROJECT

SELECT * FROM students 
INNER JOIN projects ON students.id = projects.student_id 
ORDER BY projects.title;

-- STUDENT FROM COURSES

SELECT students.id, students.first_name, courses.title FROM students 
JOIN enrolments ON students.id = enrolments.student_id 
JOIN courses ON enrolments.course_id = courses.id 
WHERE courses.title LIKE '%hybrid matrix%'

-- CLASSES WITH RE*

SELECT courses.title, students.first_name, enrolments.score FROM students 
JOIN enrolments ON students.id = enrolments.student_id 
JOIN courses ON enrolments.course_id = courses.id 
WHERE students.first_name LIKE 'Re%';


-- FULL OUTER JOIN

SELECT * FROM students
FULL OUTER JOIN projects
ON students.id = projects.student_id;

-- LEFT JOIN

SELECT * FROM students
LEFT JOIN projects
ON students.id = projects.student_id;

--Above will first do CROSS JOIN, the INNER JOIN, then
--add unjoined rows for students table

-- RIGHT JOIN

SELECT * FROM students
RIGHT JOIN projects
ON students.id = projects.student_id;

-- Above will first do CROSS JOIN, the INNER JOIN, then
-- add unjoined rows for projects table

-- STUDENTS AND PROJECTS

SELECT students.id, students.first_name, projects.title FROM students 
LEFT JOIN projects on students.id = projects.student_id;

-- WITHOUT PROJECT

SELECT students.id, students.first_name, projects.title FROM students 
LEFT JOIN projects on students.id = projects.student_id
WHERE projects.title IS NULL;

-- GROUP BY AGES

SELECT ARRAY_AGG(first_name), age, COUNT(*) AS age_count FROM students 
GROUP BY age 
ORDER BY age_count;

-- AVG SCORE OF COURSES

SELECT courses.title, AVG(enrolments.score) AS average_score  FROM courses 
INNER JOIN enrolments ON courses.id = enrolments.course_id 
GROUP BY courses.title 
ORDER BY average_score DESC;

-- LAST REGISTERED

SELECT courses.id, courses.title, MAX(enrolments.created_at) AS recent FROM courses 
INNER JOIN enrolments ON courses.id = enrolments.course_id G
ROUP BY courses.id  
ORDER BY recent DESC;

-- SUB QUERY
-- NUMBER OF ENROLLED STUDENTS

SELECT * FROM (SELECT courses.title, COUNT(*) AS student_count  FROM courses 
INNER JOIN enrolments ON courses.id = enrolments.course_id 
GROUP BY courses.title 
ORDER BY student_count DESC) AS results WHERE student_count > 5;

-- FAILING CLASSES-------

SELECT *
FROM (
    SELECT courses.id, courses.title, ROUND(AVG(enrolments.score),2) AS score_average,
    COUNT(*) AS student_count
    FROM courses
    INNER JOIN enrolments ON enrolments.course_id = courses.id
    GROUP BY courses.id
)
AS courses_with_stats
WHERE score_average < 60
ORDER BY score_average DESC;

-- IN

-- SELECT id, first_name, last_name FROM students WHERE id = 2 OR id = 3 OR id = 7;
SELECT id, first_name, last_name FROM students WHERE id IN (2, 3, 7);

-- CONSTRAINTS
-- NOT NULL

CREATE TABLE cars (
    make VARCHAR(50) CONSTRAINT must_exist NOT NULL,
    model VARCHAR(50) CONSTRAINT must_exist NOT NULL
);

-- UNIQUE

ALTER TABLE students
ADD CONSTRAINT unique_email
UNIQUE(email);

ALTER TABLE cars
ADD CONSTRAINT unique_model
UNIQUE(model);