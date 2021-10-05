CREATE TABLE IF NOT EXISTS "order"(
	id_order SERIAL PRIMARY KEY
)

ALTER TABLE "order"
ADD COLUMN "id_user" INT

ALTER TABLE "order"
ADD CONSTRAINT orderUserConstraint
FOREIGN KEY (id_user)
REFERENCES "customer"(id_user)
ON DELETE CASCADE

INSERT INTO "order" (id_user)
VALUES(1)

SELECT * FROM customers

ALTER TABLE customers
ADD COLUMN is_active BOOLEAN DEFAULT false

ALTER TABLE customers
DROP COLUMN password_user

ALTER TABLE customers
ADD COLUMN "umur_user" INT DEFAULT 0

SELECT nama_user, is_active
FROM customers cus
INNER JOIN orders o
	ON o.id_user = cus.id_user
WHERE cus.id_user = 1

SELECT *
FROM customers cus
RIGHT JOIN orders o
	ON o.id_user = cus.id_user
WHERE cus.id_user = 6



