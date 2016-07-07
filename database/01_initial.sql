DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS post;
--this will delete everything if it already exists and recreate. 


CREATE TABLE profile(
	id 			serial PRIMARY KEY,
	username	text,
	email		text --last line of a table doesn't need comma

);

CREATE TABLE post (
	id			serial PRIMARY KEY,
	body		text,
	post_date	timestamp with time zone NOT NULL,
	profile_id	integer, --this is our foreign key column

	CONSTRAINT fk_post_to_profile-- name of constraint, like a variable it can be anything
		FOREIGN KEY (profile_id)--(the name of the column that holds our foreign key)
		REFERENCES profile(id)-- (table)(name of the column for our primary key)
);

---SELECT * FROM profile;  this is the GET syntax for SQL
--SELECT first_name, last_name FROM profile; 	 only gives you these these columns
--INSERT INTO profile (username,email) VALUES ('Tristan', 'tristangross@gmail.com');
-- UPDATE profile  SET email=tristancgross@gmail.com WHERE id=2;
/*SELECT *
FROM profile
WHERE email='test@test.com'; i want to find test@test.com
WHERE id > 5 AND email='test@test.com';
MVC pattern --model view controller v=page c=server m=database




*/